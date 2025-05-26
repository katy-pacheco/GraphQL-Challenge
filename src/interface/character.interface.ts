export interface Character {
  id: string;
  name: string;
  species: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
}

export interface CharactersList {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
}
