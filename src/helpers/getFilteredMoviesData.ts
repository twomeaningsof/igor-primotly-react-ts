export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string;
  planets: string;
  starships: string;
  vehicles: string[];
  species: string[];
  url: string;
  created: string;
  edited: string;
}

const getFilteredMovieData = (movie: Movie) => {
  const { title, release_date, opening_crawl } = movie;

  const slicedOpeningCrawl =
    opening_crawl.length > 130
      ? `${opening_crawl.slice(0, 127)}...`
      : opening_crawl;

  return { title, release_date, opening_crawl: slicedOpeningCrawl };
};

export default getFilteredMovieData;
