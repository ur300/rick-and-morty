export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export type CharacterFilters = {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
}

export type CharactersParams = {
  page?: number;
  filter?: CharacterFilters;
}

