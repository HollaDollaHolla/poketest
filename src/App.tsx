import React, {useEffect} from 'react';
import { Outlet } from "react-router-dom";
import './App.scss';
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {cachedPokemonsSelector, getCachedPokemons} from "./features/pokeListSlice";
import Header from "./components/Layout/Header/Header";

function App() {
  const dispatch = useAppDispatch();
  const cachedPokemons = useAppSelector(cachedPokemonsSelector);

  useEffect(() => {
    dispatch(getCachedPokemons() as any);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header />

      {cachedPokemons.status.state === 'LOADING' ||
      cachedPokemons.status.state === 'INIT' ? (
        <div>Loading...</div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default App;
