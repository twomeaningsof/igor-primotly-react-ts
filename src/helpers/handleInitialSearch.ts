import { Dispatch, SetStateAction } from "react";
import { Character } from "./getFilteredCharacterData";
import getFilteredCharacterData from "./getFilteredCharacterData";
import { FilteredCharacter } from "@/pages";

const handleInitialSearch = async (
  setFunction: (data: FilteredCharacter[]) => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  setNextUrl: Dispatch<SetStateAction<string>>
) => {
  setLoading(true);

  try {
    const response = await fetch(`https://swapi.dev/api/people/`);

    if (!response.ok) throw new Error("Not found / response not ok");

    const data = await response.json();

    const filteredData: FilteredCharacter[] = await Promise.all(
      data.results.map(
        async (character: Character) =>
          await getFilteredCharacterData(character)
      )
    );

    setNextUrl(data.next);
    setLoading(false);
    setFunction(filteredData);
  } catch (error) {
    setLoading(false);
    setError((error as Error).message);
  }
};

export default handleInitialSearch;
