import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {pokemonsReducer} from "./pokeSlice";
import {cachedPokemonsReducer} from "./pokeListSlice";

export const rootReducer = combineReducers({
  cachedPokemons: cachedPokemonsReducer,
  pokemons: pokemonsReducer,
  // species: speciesReducer,
  // evolutionChain: evolutionChainReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
