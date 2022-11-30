import React from "react";
import {Link} from "react-router-dom";
import {
  Button,
  createStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
  Theme
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {useAppSelector} from "../../hooks/redux";
import InfiniteScroll from "../../components/InfiniteScroll";
import {getPokemons, pokemonsSelector} from "../../features/pokeSlice";
import {cachedPokemonsSelector} from "../../features/pokeListSlice";
import PokeListSearchForm from "../../components/PokeListSearchForm";
import {PokeTypeColors} from "../../features/types";
import {EnumHelper} from "../../utils/EnumUtil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    HomePage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 0',
      minHeight: 'calc(100vh - var(--header-h))',
    },
    HomePageSearch: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px 32px',
    },
    imageList: {},
    imageItem: {
      width: '100% !important',
      // minWidth: 250,
      // [theme.breakpoints.up('xs')]: {
      //   width: 'calc(100% / 2) !important',
      // },
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% / 2) !important',
      },
      [theme.breakpoints.up('md')]: {
        width: 'calc(100% / 3) !important',
      },
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% / 4) !important',
      },
      [theme.breakpoints.up('xl')]: {
        width: 'calc(100% / 5) !important',
      },
    },
    imageItemInner: {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    imageItemImg: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const HomePage = () => {
  const pokemons = useAppSelector(pokemonsSelector);
  const cachedPokemons = useAppSelector(cachedPokemonsSelector);

  const itemsPerPage = 12;

  const classes = useStyles();

  // it's an example how to use enums as dynamic types
  const colorObject = EnumHelper.enumToObject<PokeTypeColors>(PokeTypeColors, [], true)

  const getTypeBackgroundColor = (type: string): string => {
    return colorObject[type] || '#ffffff'
  }

  return (
    <div className={classes.HomePage}>
      <InfiniteScroll
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
            <div className={classes.HomePageSearch}>
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
                    <ImageList rowHeight={250} className={classes.imageList} gap={10}>
                      {pokemons.data.map((pokemon, index) =>
                        pokemon === null || pokemon.empty ? (
                          <ImageListItem key={pokemon?.id} className={classes.imageItem}>
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
                          <ImageListItem key={pokemon.id} className={classes.imageItem}>
                            <Link to={`pokemon/${pokemon.id}`} className={classes.imageItemInner}>
                              <img className={classes.imageItemImg} src={pokemon.img} alt={pokemon.name}
                                   loading="lazy"/>
                              <ImageListItemBar
                                title={pokemon.name}
                                subtitle={
                                  <div>
                                    <div>#{pokemon.id}</div>
                                    {
                                      pokemon.types.map(type =>
                                        <Button variant="outlined"
                                                style={{color: getTypeBackgroundColor(type.type.name)}}>
                                          {type.type.name}
                                        </Button>
                                      )
                                    }
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
    </div>
  );
};
export default HomePage;
