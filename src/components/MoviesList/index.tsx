import { FilteredMovie } from "@/pages/character/[name]";
import MovieItem from "../MovieItem";

interface MoviesListProps {
  movies: FilteredMovie[];
  loading: boolean;
  error: string;
}

const MoviesList = ({ movies, loading, error }: MoviesListProps) => {
  if (loading)
    return <h1 className="mt-20 text-3xl text-yellow-500">Loading...</h1>;

  if (!loading && error.length > 0)
    return <h1 className="mt-20 text-3xl text-red-600">{error}</h1>;

  if (!(movies.length > 0)) return <div>Could not find any movies</div>;

  return (
    <ul className="flex flex-wrap justify-around">
      {movies.map((movie, index) => (
        <MovieItem key={index} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
