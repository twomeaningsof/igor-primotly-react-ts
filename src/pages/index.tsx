import { useEffect, useState } from "react";
import getFilteredCharacterData from "../helpers/getFilteredCharacterData";
import { Character } from "../helpers/getFilteredCharacterData";
import CharacterList from "@/components/CharactersList";
import SearchInput from "@/components/Search";
import handleInitialSearch from "@/helpers/handleInitialSearch";

export type FilteredCharacter = Pick<Character, "name"> & {
  homeworld: string;
  population: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<FilteredCharacter[]>([]);
  const [characterFilter, setCharacterFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${characterFilter}`
      );

      if (!response.ok) throw new Error("Not found / response not ok");

      let data = await response.json();

      while (data.next) {
        const response = await fetch(data.next);
        const nextData = await response.json();
        data = { ...nextData, results: [...data.results, ...nextData.results] };
      }

      const filteredData = await Promise.all(
        data.results.map(
          async (character: Character) =>
            await getFilteredCharacterData(character)
        )
      );

      setLoading(false);
      setCharacters(filteredData);
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    handleInitialSearch(setCharacters, setLoading, setError);
  }, []);

  return (
    <>
      <SearchInput
        value={characterFilter}
        onChange={setCharacterFilter}
        handleSearch={handleSearch}
      />
      <CharacterList characters={characters} loading={loading} error={error} />
    </>
  );
}
