import {CircularProgress, createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import {useEffect} from "react";
import {getPokemonById, pokemonsSelector} from "../../features/pokeSlice";
import {PokeTypeColors} from "../../features/types";
import {Link, useParams} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import PokeAbilities from "../../components/PokemonDetails/PokeAbilities";
import PokeMoves from "../../components/PokemonDetails/PokeMoves";
import PokeStats from "../../components/PokemonDetails/PokeStats";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    DetailsPage: {
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      // justifyContent: 'center',
      padding: '24px 0',
      minHeight: 'calc(100vh - var(--header-h))',
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
    //eslint-disable-next-line
  }, [id, pokemon]);


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
    {isPageLoading ? (
      <div>
        <CircularProgress color="secondary"/>
      </div>
    ) : (
      <>
        <>
          {pokemon &&
          // selectedSpecies &&
          selectedBackgroundColor && (
          // selectedEvolutionChain && (
          <div className="pb-8">
            <Link to={'/'}>
              <IconButton>
                <ArrowBack/>
              </IconButton>
            </Link>
            <div>
              <img src={pokemon.img} alt={pokemon.name} />
              <div>
                <span>#{pokemon.id}</span><span>{pokemon.name}</span>
              </div>

              <PokeAbilities pokemon={pokemon}/>
              <PokeMoves pokemon={pokemon}/>
              <PokeStats pokemon={pokemon}/>
            </div>
          </div>
          )}
        </>
      </>
    )}
  </div>
}

export default DetailsPage;
