import InfiniteScroll from "../InfiniteScroll";
import {getPokemons, pokemonsSelector} from "../../features/pokeSlice";
import PokeListSearchForm from "../PokeListSearchForm";
import Container from "@material-ui/core/Container";
import {Button, createStyles, ImageList, ImageListItem, ImageListItemBar, makeStyles, Theme, Chip} from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../hooks/redux";
import {cachedPokemonsSelector} from "../../features/pokeListSlice";
import {EnumHelper} from "../../utils/EnumUtil";
import {PokeTypeColors} from "../../features/types";

// it's an example how to use enums as dynamic types
const colorObject = EnumHelper.enumToObject<PokeTypeColors>(PokeTypeColors, [], true)

const getTypeBackgroundColor = (type: string): string => {
  return colorObject[type] || '#ffffff'
}

const usePokemonChipStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelSmall: (color: { bgColor?: string }) => ({
      paddingLeft: '8px',
      paddingRight: '8px',
      backgroundColor: getTypeBackgroundColor(color?.bgColor || theme.palette.primary.main),
      margin: '0 4px',
    })
  }),
);

export const PokemonChip = ({ name }: { name: string }) => {
  const props = { bgColor: name };
  const classes = usePokemonChipStyles(props);

  return <Chip color={'primary'}
               size={'small'}
               label={name}
               className={classes.labelSmall} />
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PokemonListSearch: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px 32px',
    },
    imageList: {},
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
        <div className={classes.PokemonListSearch}>
          <PokeListSearchForm
            mutatePage={mutatePage}
          />
        </div>
        <Container>
          {!(
            cachedPokemons.status.state === "LOADING" ||
            cachedPokemons.status.state === "INITIAL"
          ) && (
            <>
              <InfiniteScroll.Container>
                <ImageList cols={1} rowHeight={250} className={classes.imageList} gap={10}>
                  {pokemons.data.map((pokemon, index) =>
                    pokemon === null || pokemon.empty ? (
                      <ImageListItem cols={1} key={pokemon?.id} className={classes.imageItem}>
                        <div className={classes.imageItemInner}>
                          <img className={classes.imageItemImg} alt="loading"
                               src="https://oi.flyimg.io/upload/w_273/https://assets.pokemon.com/assets/cms2/img/pokedex/detail/129.png"/>
                          <ImageListItemBar
                            title={pokemon?.id}
                            subtitle={<span>loading...</span>}
                          />
                        </div>
                      </ImageListItem>
                    ) : (
                      <ImageListItem cols={1} key={pokemon.id} className={classes.imageItem}>
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
