import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {pokemonsSelector, resetPokemonsReducer} from "../features/pokeSlice";
import {searchPokemonsByNameReducer} from "../features/pokeListSlice";
import {createStyles, IconButton, InputBase, makeStyles, Paper, Theme} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '15px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
      height: 30,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    }
  }),
);

type Props = {
  mutatePage: React.Dispatch<React.SetStateAction<number>>;
  placeholder?: string;
};

const PokeListSearchForm = ({
                       mutatePage,
                     }: Props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector(pokemonsSelector);
  const [value, setValue] = useState<string>("");

  const isLoading = pokemons.status.state === 'LOADING';

  const classes = useStyles();

  const submitFormHandler = () => {
    if (!isLoading) {
      dispatch(resetPokemonsReducer({}));
      dispatch(searchPokemonsByNameReducer({ pokemonName: value }));
      mutatePage(0);
    }
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={value}
        placeholder="Search by name..."
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            submitFormHandler();
          }
        }}
        onChange={(e) =>
          setValue(e.currentTarget.value)
        }
      />
      <IconButton type="button" className={classes.iconButton} aria-label="search"  onClick={submitFormHandler}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default PokeListSearchForm;
