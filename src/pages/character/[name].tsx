import { NextPageContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";
import getFilteredMovieData from "@/helpers/getFilteredMoviesData";
import getServerSideQueryParamFromContext from "@/helpers/getServerSideQueryFromParams";
import { Movie } from "@/helpers/getFilteredMoviesData";
import routes from "@/constants/routes";

interface CharacterPageProps {
  name: string;
}

export type FilteredMovie = Pick<
  Movie,
  "title" | "release_date" | "opening_crawl"
>;

const CharacterPage = ({ name }: CharacterPageProps) => {
  const [movies, setMovies] = useState<FilteredMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    const handleSearch = async (name: string) => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${name}`
        );

        if (!response.ok) throw new Error("Not found / response not ok");

        const data = await response.json();
        const moviesURLs = data.results[0].films;

        const moviesData = await Promise.all(
          moviesURLs.map(
            async (movieURL: string) =>
              await fetch(movieURL)
                .then((response) => response.json())
                .then((data) => data)
          )
        );

        const filteredData = moviesData.map((movie: Movie) =>
          getFilteredMovieData(movie)
        );

        setLoading(false);
        setMovies(filteredData);
      } catch (error) {
        setLoading(false);
        setError((error as Error).message);
      }
    };

    handleSearch(name);
  }, [name]);

  return (
    <>
      <header className="mb-10 font-bak text-5xl md:text-7xl text-center select-none text-white">
        {name}
      </header>
      <MoviesList movies={movies} loading={loading} error={error} />
      <Link
        href={routes.getHomeRoute()}
        className="absolute top-0 right-0 p-2 m-5 rounded-lg font-bak text-xl text-black bg-[#eeeeee]"
      >
        Back
      </Link>
    </>
  );
};

export default CharacterPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const name = getServerSideQueryParamFromContext(context, "name");
  return {
    props: { name },
  };
};
