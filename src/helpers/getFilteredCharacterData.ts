export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string[];
  created: string;
  edited: string;
}

const getFilteredCharacterData = async (character: Character) => {
  const getHomeWorldData = async (character: Character) => {
    const response = await fetch(character.homeworld);
    const data = await response.json();
    const { name: homeworld, population } = data;
    return {
      homeworld,
      population:
        population === "unknown" ? population : `${population / 1000}k`,
    };
  };

  const { name } = character;
  const homeWorldData = await getHomeWorldData(character);

  return { name, ...homeWorldData };
};

export default getFilteredCharacterData;
