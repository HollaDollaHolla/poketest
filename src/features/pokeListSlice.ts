import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {PokeList} from "./types";
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
      const { cachedPokemons } = action.payload;
      state.cache = cachedPokemons;
      state.data = [...cachedPokemons];
    },
    searchPokemonsByNameReducer(
      state,
      action: PayloadAction<{
        pokemonName: string;
      }>
    ) {
      const { pokemonName } = action.payload;

      state.data = state.cache.filter(p => p.name.includes(pokemonName))
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
  searchPokemonsByNameReducer
} = cachedPokeListSlice.actions;

const statusHandler = { initialize, error, success };

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
