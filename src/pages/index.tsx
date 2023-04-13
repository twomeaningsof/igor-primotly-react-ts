import { useEffect, useState } from "react";
import getFilteredCharacterData from "../helpers/getFilteredCharacterData";
import { Character } from "../helpers/getFilteredCharacterData";
import CharacterList from "@/components/CharactersList";
import SearchInput from "@/components/Search";
import handleInitialSearch from "@/helpers/handleInitialSearch";
import handleSearchMore from "@/helpers/handleSearchMore";

export type FilteredCharacter = Pick<Character, "name"> & {
  homeworld: string;
  population: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<FilteredCharacter[]>([]);
  const [characterFilter, setCharacterFilter] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${characterFilter}`
      );

      if (!response.ok) throw new Error("Not found / response not ok");

      const data = await response.json();

      const filteredData = await Promise.all(
        data.results.map(
          async (character: Character) =>
            await getFilteredCharacterData(character)
        )
      );

      setNextUrl(data.next);
      setLoading(false);
      setCharacters(filteredData);
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    handleInitialSearch(setCharacters, setLoading, setError, setNextUrl);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [characters]);

  return (
    <>
      <SearchInput
        value={characterFilter}
        onChange={setCharacterFilter}
        handleSearch={handleSearch}
      />
      <CharacterList characters={characters} loading={loading} error={error} />
      {!loading && nextUrl !== null && nextUrl.length > 0 && (
        <button
          onClick={() =>
            handleSearchMore(
              nextUrl,
              characters,
              setCharacters,
              setLoading,
              setError,
              setNextUrl
            )
          }
          className="text-yellow-500 font-bak"
        >
          Fetch more
        </button>
      )}
    </>
  );
}
