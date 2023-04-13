import { Dispatch, SetStateAction } from "react";
import { Character } from "./getFilteredCharacterData";
import getFilteredCharacterData from "./getFilteredCharacterData";
import { FilteredCharacter } from "@/pages";

const handleSearchMore = async (
  url: string | null,
  characters: FilteredCharacter[],
  setFunction: (data: FilteredCharacter[]) => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  setNextUrl: Dispatch<SetStateAction<string>>
) => {
  if (url === null) return;

  setLoading(true);

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Not found / response not ok");

    const data = await response.json();

    const filteredData: FilteredCharacter[] = await Promise.all(
      data.results.map(
        async (character: Character) =>
          await getFilteredCharacterData(character)
      )
    );

    const combinedData = [...characters, ...filteredData];

    setNextUrl(data.next);
    setLoading(false);
    setFunction(combinedData);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } catch (error) {
    setLoading(false);
    setError((error as Error).message);
  }
};

export default handleSearchMore;
