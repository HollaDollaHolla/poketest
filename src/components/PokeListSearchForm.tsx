import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {pokemonsSelector, resetPokemonsReducer} from "../features/pokeSlice";
import {searchPokemonsByNameReducer, sortPokemonsByNameReducer} from "../features/pokeListSlice";
import {createStyles, IconButton, InputBase, makeStyles, Paper, Theme} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {SortOrder} from "../features/types";
import {ArrowDownward, ArrowUpward, Height} from "@material-ui/icons";

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
      dispatch(searchPokemonsByNameReducer({pokemonName: value}));
      mutatePage(0);
    }
  };

  const getNextSortOrder = (): SortOrder => {
    switch (selectedSorting)
    {
      case SortOrder.Asc:
        return SortOrder.Desc
      case SortOrder.Desc:
        return SortOrder.None;
      default:
        return SortOrder.Asc
    }
  }

  const sortingHandler = () => {
    if (!isLoading){
      const nextSortOrder = getNextSortOrder()

      setSelectedSorting(nextSortOrder)
      dispatch(resetPokemonsReducer({}));
      dispatch(sortPokemonsByNameReducer({ sortOrder: nextSortOrder }));
      mutatePage(0);
    }
  }

  const [
    selectedSorting,
    setSelectedSorting,
  ] = useState<SortOrder>(SortOrder.None);

  return (
    <Paper className={classes.root}>
      <IconButton onClick={sortingHandler}>
        {(selectedSorting === SortOrder.None) &&
        (
          <Height/>
        )}

        {(selectedSorting === SortOrder.Asc) &&
        (
          <ArrowUpward/>
        )}

        {(selectedSorting === SortOrder.Desc) &&
        (
          <ArrowDownward/>
        )}
      </IconButton>
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
      <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={submitFormHandler}>
        <SearchIcon/>
      </IconButton>
    </Paper>
  );
};

export default PokeListSearchForm;
