import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {Humps} from "../utils/humps";
import pokeApi from "../api/pokeAPI";
import {PokeList} from "./types";
import {statusHandlerReducer, wrapReduxAsyncHandler} from "./utils";
import {PokeImageTransform} from "../utils/PokeImageTransform";

export type Pokemon = {
  empty: boolean;
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
  abilities: {
    isHidden: boolean;
    slot: number;
    ability: PokeList;
  }[];
  forms: PokeList[];
  moves: {
    move: PokeList;
  }[];
  sprites: {
    frontDefault: string;
    frontShiny: string;
    frontFemale: string;
    frontShinyFemale: string;
    backDefault: string;
    backShiny: string;
    backFemale: string;
    backShinyFemale: string;
  };
  species: PokeList[];
  stats: {
    baseStat: number;
    effort: number;
    stat: PokeList;
  }[];
  types: {
    slot: number;
    type: PokeList;
  }[];
  img: string;
};

type SliceState = {
  data: (Pokemon | null)[];
  cache: (Pokemon)[],
  status: {
    state: string;
  };
};

const initialState: SliceState = {
  data: [],
  cache: [],
  status: {
    state: "INITIAL",
  },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    initializePokemonsReducer(state, action: PayloadAction<{ ids: number[] }>) {
      const {ids} = action.payload;

      const idsToAdd: Pokemon[] = [];

      for (const id of ids) {
        if (!state.data.find((item: Pokemon | null) => item?.id === id)) {
          idsToAdd.push({
            id,
            empty: true
          } as Pokemon);
        }
      }

      state.data = state.data.concat(idsToAdd);
    },
    getPokemonsReducer(
      state,
      action: PayloadAction<{ pokemon: Pokemon; }>
    ) {
      const {pokemon} = action.payload;

      const isPokemonAlreadyExists = state.data.find(
        (existingPokemon) =>
          existingPokemon !== null && existingPokemon.id === pokemon.id
      );

      if (!isPokemonAlreadyExists || !isPokemonAlreadyExists.empty) {
        return;
      }

      state.data[state.data.indexOf(isPokemonAlreadyExists)] = pokemon

    },
    getPokemonCacheReducer(
      state,
      action: PayloadAction<{ pokemon: Pokemon; }>
    ) {
      const {pokemon} = action.payload;

      const isPokemonAlreadyExists = state.cache.find(
        (existingPokemon) =>
          existingPokemon !== null && existingPokemon.id === pokemon.id
      );

      if (isPokemonAlreadyExists) {
        return;
      }

      state.cache = [...state.cache, pokemon]

    },
    getSinglePokemonReducer(
      state,
      action: PayloadAction<{ pokemon: Pokemon }>
    ) {
      const {pokemon} = action.payload;
      const isPokemonAlreadyExists = state.data.find(
        (existingPokemon) =>
          existingPokemon !== null && existingPokemon.id === pokemon.id
      );
      if (!isPokemonAlreadyExists) {
        state.data.push(pokemon);
      }
    },
    resetPokemonsReducer(state, action) {
      state.data = [];
    },
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  initializePokemonsReducer,
  getPokemonsReducer,
  resetPokemonsReducer,
  getSinglePokemonReducer,
  getPokemonCacheReducer,
} = pokemonsSlice.actions;

export const pokemonsSelector = (state: RootState) => state.pokemons;

const statusHandler = {initialize, error, success};

export const getPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, {page, cachedPokemonList, itemsPerPage, cachedPokemons}) => {
    const results = cachedPokemonList.slice(page, page + itemsPerPage) as Pokemon[];
    const getIdFromUrl = (url: string): number => Number(url.split('/').slice(-2)[0]);

    if (!results?.length){
      return;
    }

    const ids = results.map(({url}: any) => getIdFromUrl(url))

    dispatch(initializePokemonsReducer({ids }));

    const cachedData: Pokemon[] = []
    const missedIds: number[] = []

    for (const id of ids) {
      const cachedItem = cachedPokemons.find((p: Pokemon) => p.id === id);

      if (!cachedItem) {
        missedIds.push(id);
      } else {
        cachedData.push(cachedItem);
      }
    }

    for (const cachedItem of cachedData) {
      dispatch(
        getPokemonsReducer({
          pokemon: {
            ...cachedItem,
          }
        }),
      );
    }

    const promisesToWait = []

    for (const id of missedIds) {
      promisesToWait.push(pokeApi.getPokemonByNameOrId(id).then(pokemon => {
        const camelizedPokemon = Humps.camelizeKeys(pokemon);
        camelizedPokemon.img = PokeImageTransform.TransformImage(camelizedPokemon.id)

        dispatch(
          getPokemonsReducer({
            pokemon: {
              ...camelizedPokemon,
            }
          }),
        );

        dispatch(
          getPokemonCacheReducer({
            pokemon: {
              ...camelizedPokemon,
            }
          }),
        );
      }))
    }

    await Promise.all(promisesToWait);
  }
);

export const getPokemonById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, {pokemonId}) => {
    const pokemon = await pokeApi.getPokemonByNameOrId(pokemonId);

    const transformedPokemon = {
      ...Humps.camelizeKeys(pokemon),
    };
    dispatch(getSinglePokemonReducer({pokemon: transformedPokemon}));
  }
);

export const getPokemonsDynamically = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, {pokemonIds}) => {
    for await (const id of pokemonIds) {
      const pokemon = await pokeApi.getPokemonByNameOrId(id);

      const transformedPokemon = {
        ...Humps.camelizeKeys(pokemon)
      };
      dispatch(getSinglePokemonReducer({pokemon: transformedPokemon}));
    }
  }
);
