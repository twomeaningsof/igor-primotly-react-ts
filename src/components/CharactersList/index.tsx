import { FilteredCharacter } from "@/pages";
import CharacterItem from "../CharacterItem";

interface CharacterListProps {
  characters: FilteredCharacter[];
  loading: boolean;
  error: string;
}

const CharacterList = ({ characters, loading, error }: CharacterListProps) => {
  if (loading)
    return <h1 className="mt-20 text-3xl text-yellow-500">Loading...</h1>;

  if (!loading && error.length > 0)
    return <h1 className="mt-20 text-3xl text-red-600">{error}</h1>;

  if (!(characters.length > 0))
    return (
      <div className="mt-20 text-3xl text-yellow-500">
        Could not find any characters
      </div>
    );

  return (
    <ul className="flex flex-wrap justify-around">
      {characters.map((character, index) => (
        <CharacterItem key={index} character={character} />
      ))}
    </ul>
  );
};

export default CharacterList;
