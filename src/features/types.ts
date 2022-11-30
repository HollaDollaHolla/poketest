export type PokeListResponse = {
  results: PokeList[];
  next: string;
  count: number | null;
  previous: number | null;
}

export type PokeList = {
  name: string;
  url: string;
  id: number;
};

export enum PokeTypeColors {
  normal = '#CDCDB9',
  fire = '#F4934D',
  fighting = "#BA5852",
  water = '#85A5F0',
  flying = '#B8A5F2',
  grass = '#99D07D',
  poison = '#A768A7',
  electric = '#F9DF78',
  ground = '#EDD081',
  psychic = '#F47DA1',
  rock = '#C5B059',
  ice = '#B3E1E1',
  bug = '#B5C534',
  dragon = '#8656FA',
  ghost = '#7D6B9B',
  dark = '#756459',
  steel = '#C1C1D1',
  fairy = '#EFA7B7',
}

export enum SortOrder {
  None = 0,
  Desc = 1,
  Asc = 2
}
