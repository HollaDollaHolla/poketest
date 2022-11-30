import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {PokeList, SortOrder} from "./types";
import {statusHandlerReducer, wrapReduxAsyncHandler} from "./utils";
import {Humps} from "../utils/humps";
import pokeApi from "../api/pokeAPI";

type SliceState = {
  cache: (PokeList & { distance: number })[];
  data: (PokeList & { distance: number })[];
  status: {
    state: string;
  };
};

const initialState: SliceState = {
  cache: [],
  data: [],
  status: {
    state: "INIT",
  },
};

const cachedPokeListSlice = createSlice({
  name: "cachedPokemons",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getCachedPokemonsReducer(
      state,
      action: PayloadAction<{
        cachedPokemons: (PokeList & { distance: number })[];
      }>
    ) {
      const {cachedPokemons} = action.payload;

      const getIdFromUrl = (url: string): number => Number(url.split('/').slice(-2)[0]);

      const mappedCachedPokemons = cachedPokemons.map(p => {
        return {
          ...p,
          id: getIdFromUrl(p.url)
        }
      })

      state.cache = mappedCachedPokemons;
      state.data = [...mappedCachedPokemons];
    },
    searchPokemonsByNameReducer(
      state,
      action: PayloadAction<{
        pokemonName: string;
      }>
    ) {
      const {pokemonName} = action.payload;

      state.data = state.cache.filter(p => p.name.includes(pokemonName))
        .map((pokemon) => {
          return {
            ...pokemon
          };
        })
    },
    sortPokemonsByNameReducer(
      state,
      action: PayloadAction<{
        sortOrder: SortOrder;
      }>
    ) {
      const {sortOrder} = action.payload;

      state.data = state.cache.sort((a, b) => a.id - b.id)
        .map((pokemon) => {
          return {
            ...pokemon
          };
        })
      if (sortOrder == SortOrder.None) {

        return;
      }

      state.data = state.cache.sort((a, b) =>
        sortOrder == SortOrder.Asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
        .map((pokemon) => {
          return {
            ...pokemon
          };
        })
    }
  },
});

export const cachedPokemonsReducer = cachedPokeListSlice.reducer;
export const {
  initialize,
  error,
  success,
  getCachedPokemonsReducer,
  searchPokemonsByNameReducer,
  sortPokemonsByNameReducer
} = cachedPokeListSlice.actions;

const statusHandler = {initialize, error, success};

export const cachedPokemonsSelector = (state: RootState) =>
  state.cachedPokemons;

export const getCachedPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch) => {
    const {
      results,
    }: { results: PokeList[] } = await pokeApi.getPokemons(1100);
    const transformedPokemons = results.map((res: PokeList) => ({
      ...res,
    }));
    dispatch(
      getCachedPokemonsReducer({
        cachedPokemons: Humps.camelizeKeys(transformedPokemons),
      })
    );
  }
);
