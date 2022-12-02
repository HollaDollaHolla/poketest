import React, {useEffect} from "react";
import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import {getPokemonById, pokemonsSelector} from "../../features/pokeSlice";
import {PokeTypeColors} from "../../features/types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import PokemonDetailsCard from "../../components/PokemonDetails/PokemonDetailsCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    DetailsPage: {
      padding: '32px 0 0',
      minHeight: '100vh',
    },
  }),
);

export const DetailsPage = () => {
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const pokemons = useAppSelector(pokemonsSelector);

  const pokemon = pokemons.data.find(
    (pokemon) => pokemon !== null && pokemon.id === Number(id));

  useEffect(() => {
    if (!pokemon && pokemons.status.state !== 'LOADING') {
      dispatch(getPokemonById({pokemonId: id}) as any);
    }
  }, [id, pokemon, dispatch, pokemons.status.state]);

  const backgroundColors = pokemon?.types.map(({type}) => {
    const [[, backgroundColor]] = Object.entries(PokeTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  const selectedBackgroundColor = backgroundColors && backgroundColors[0];

  const isPageLoading =
    pokemons.status.state === 'LOADING' ||
    pokemons.status.state === 'INIT';

  return <div className={classes.DetailsPage}>
    <Container>
      {isPageLoading ? ( <Box><CircularProgress color="secondary"/></Box>
      ) : <>
        {pokemon && selectedBackgroundColor ? <PokemonDetailsCard pokemon={pokemon}/> : null}
      </>}
    </Container>
  </div>
}

export default DetailsPage;
