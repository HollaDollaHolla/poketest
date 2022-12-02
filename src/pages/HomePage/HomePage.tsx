import React from "react";
import {
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";
import PokemonList from "../../components/PokemonList/PokemonList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    HomePage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 0',
      minHeight: '100vh',
    },
  }),
);

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.HomePage}>
      <PokemonList />
    </div>
  );
};
export default HomePage;
