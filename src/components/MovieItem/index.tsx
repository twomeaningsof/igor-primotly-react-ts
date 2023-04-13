import { FilteredMovie } from "@/pages/character/[name]";

interface MovieItemProps {
  movie: FilteredMovie;
}

const MovieItem = ({ movie }: MovieItemProps) => (
  <li className="w-72 h-64 mx-16 my-8 flex flex-col rounded-md font-bak bg-gray-900/90 shadow-[0_0px_100px_-50px_rgb(255,255,255)] hover:scale-105 duration-300 cursor-default select-none">
    <div className="p-3 flex flex-col justify-between rounded-t-md bg-black shadow-[inset_0_30px_40px_rgba(255,255,255,0.167)] ">
      <span className="rounded-t-md text-yellow-500 text-xl tracking-wider ">
        {movie.title}
      </span>
      <span>{movie.release_date}</span>
    </div>
    <div className="mt-4 px-3 flex flex-col items-center">
      <span>Opening Crawl</span>
      <p className="mt-2 text-center text-yellow-500">{movie.opening_crawl}</p>
    </div>
  </li>
);

export default MovieItem;
