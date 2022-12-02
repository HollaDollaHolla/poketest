import React, {useEffect} from 'react';
import { Outlet } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { cachedPokemonsSelector, getCachedPokemons } from "./features/pokeListSlice";
import Header from "./components/Layout/Header/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--header-h) 0 24px',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
    },
  }),
);

function App() {
  const dispatch = useAppDispatch();
  const cachedPokemons = useAppSelector(cachedPokemonsSelector);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCachedPokemons() as any);
  }, [ dispatch ]);

  return (
    <div className={classes.root}>
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
