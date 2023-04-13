import Link from "next/link";
import { FilteredCharacter } from "@/pages";
import routes from "@/constants/routes";

interface CharacterItemProps {
  character: FilteredCharacter;
}

const CharacterItem = ({ character }: CharacterItemProps) => (
  <Link href={routes.getCharacterRoute(character.name)}>
    <li className="w-72 h-32 mx-6 my-8 flex flex-col rounded-md font-bak bg-gray-900/90 shadow-[0_0px_100px_-50px_rgb(255,255,255)] hover:scale-105 duration-300 select-none">
      <span className="p-3 flex justify-between rounded-t-md bg-black shadow-[inset_0_30px_40px_rgba(255,255,255,0.167)] text-yellow-500 text-xl tracking-wider">
        {character.name}
      </span>
      <div className="grow flex flex-col justify-center">
        <div className="px-3 mb-1 flex justify-between">
          <span>Origin</span>
          <span className="underline underline-offset-2">
            {character.homeworld}
          </span>
        </div>
        <div className="px-3 mt-1 flex justify-between">
          <span>Origin&apos;s population</span>
          <span className="underline underline-offset-2">
            {character.population}
          </span>
        </div>
      </div>
    </li>
  </Link>
);

export default CharacterItem;
