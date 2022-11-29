export type PokeListResponse = {
  results: PokeList[];
  next: string;
  count: number | null;
  previous: number | null;
}

export type PokeList = {
  name: string;
  url: string;
};
