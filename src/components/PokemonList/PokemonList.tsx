import InfiniteScroll from "../InfiniteScroll";
import {getPokemons, pokemonsSelector} from "../../features/pokeSlice";
import PokeListSearchForm from "./PokeListSearchForm";
import Container from "@material-ui/core/Container";
import { createStyles, ImageList, ImageListItem, ImageListItemBar, makeStyles, Theme } from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../hooks/redux";
import {cachedPokemonsSelector} from "../../features/pokeListSlice";
import PokemonChip from "./PokemonChip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PokemonListSearch: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    imageList: {},
    root: {
      overflowY: 'visible'
    },
    imageItem: {
      maxWidth: 'calc(100% / 5)',

      [theme.breakpoints.down('lg')]: {
        maxWidth: 'calc(100% / 4)',
      },
      [theme.breakpoints.down('md')]: {
        maxWidth: 'calc(100% / 3)',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'calc(100% / 2)',
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
      },
    },
    imageItemInner: {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    imageItemImg: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    imageListItemBarAction: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '8px',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    }
  }),
);

export const PokemonList = () => {
  const pokemons = useAppSelector(pokemonsSelector);
  const cachedPokemons = useAppSelector(cachedPokemonsSelector);

  const itemsPerPage = 12;

  const classes = useStyles();

  return <InfiniteScroll
    totalCount={cachedPokemons.data.length}
    itemsPerPage={itemsPerPage}
    paginationHandler={(page: number) =>
      getPokemons({
        itemsPerPage,
        page,
        cachedPokemonList: cachedPokemons.data,
        cachedPokemons: pokemons.cache,
        pokemons: pokemons.data,
      })
    }
    isLoading={pokemons.status.state === "LOADING"}
  >
    {({mutatePage}) => (
      <>
        <Container className={classes.PokemonListSearch}>
          <PokeListSearchForm
            mutatePage={mutatePage}
          />
        </Container>
        <Container>
          {!(
            cachedPokemons.status.state === "LOADING" ||
            cachedPokemons.status.state === "INITIAL"
          ) && (
            <>
              <InfiniteScroll.Container>
                <ImageList cols={1} rowHeight={250} className={classes.root} gap={10}>
                  {pokemons.data.map((pokemon, index) =>
                    pokemon === null || pokemon.empty ? (
                      <ImageListItem cols={1} key={index} className={classes.imageItem}>
                        <div className={classes.imageItemInner}>
                          <img className={classes.imageItemImg}
                               alt="loading"
                               src="https://oi.flyimg.io/upload/w_273/https://assets.pokemon.com/assets/cms2/img/pokedex/detail/129.png"/>
                          <ImageListItemBar
                            title={pokemon?.id}
                            subtitle={<span>loading...</span>}
                          />
                        </div>
                      </ImageListItem>
                    ) : (
                      <ImageListItem cols={1} key={pokemon.name} className={classes.imageItem}>
                        <Link to={`pokemon/${pokemon.id}`} className={classes.imageItemInner}>
                          <img className={classes.imageItemImg} src={pokemon.img} alt={pokemon.name}
                               loading="lazy"/>
                          <ImageListItemBar
                            title={`#${pokemon.id} - ${pokemon.name}`}
                            subtitle={
                              <div className={classes.imageListItemBarAction}>
                                { pokemon.types.map(type => <PokemonChip key={type.type.id} name={type.type.name}/>) }
                              </div>
                            }
                          />
                        </Link>
                      </ImageListItem>
                    )
                  )}
                </ImageList>
              </InfiniteScroll.Container>

              <InfiniteScroll.Waypoint/>
            </>
          )}
        </Container>
      </>
    )}
  </InfiniteScroll>
}

export default PokemonList;
