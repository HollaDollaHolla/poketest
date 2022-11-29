import React, {useEffect} from 'react';
import { Link, Outlet } from "react-router-dom";
import logo from './logo.svg';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {cachedPokemonsSelector, getCachedPokemons} from "./features/pokeListSlice";

function App() {
  const dispatch = useDispatch();
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  useEffect(() => {
    dispatch(getCachedPokemons() as any);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}

        {/*<nav className='link-list'>*/}
        {/*  <Link to="/" className='link'>Home Page</Link>*/}
        {/*  <Link to="/details/1" className='link'>Details Page</Link>*/}
        {/*</nav>*/}

        {cachedPokemons.status.state === 'LOADING' ||
        cachedPokemons.status.state === 'INIT' ? (
          <div>Loading...</div>
        ) : (
          <Outlet />
        )}

      </header>
    </div>
  );
}

export default App;
