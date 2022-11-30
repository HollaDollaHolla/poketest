import {useSelector} from "react-redux";
import InfiniteScroll from "../../components/InfiniteScroll";
import {getPokemons, Pokemon, pokemonsSelector} from "../../features/pokeSlice";
import {cachedPokemonsSelector} from "../../features/pokeListSlice";
import PokeListSearchForm from "../../components/PokeListSearchForm";
import {
  createStyles,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
  Theme
} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      margin: '20px'
      // backgroundColor: theme.palette.background.paper,
    },
    imageList: {},
    imageItem: {
      minWidth: 250
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const HomePage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  const itemsPerPage = 36;

  const classes = useStyles();

  return (
    <div>
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
            <div>
              <PokeListSearchForm
                mutatePage={mutatePage}
              />
            </div>
            <div>
              {!(
                cachedPokemons.status.state === "LOADING" ||
                cachedPokemons.status.state === "INITIAL"
              ) && (
                <>
                  <InfiniteScroll.Container>
                    <ImageList cols={6} rowHeight={250} className={classes.imageList}>
                      {pokemons.data.map((pokemon, index) =>
                        pokemon === null || pokemon.empty ? (
                          <ImageListItem key={pokemon?.id} cols={1} className={classes.imageItem}>
                            <img
                              src="https://oi.flyimg.io/upload/w_273/https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/129.png"/>
                            <ImageListItemBar
                              title={pokemon?.id}
                              subtitle={<span>loading...</span>}
                            />
                          </ImageListItem>
                        ) : (
                          <ImageListItem key={pokemon.id} cols={1} className={classes.imageItem}>
                            <img src={pokemon.img} alt={pokemon.name} loading="lazy"/>
                            <ImageListItemBar
                              title={pokemon.name}
                              subtitle={<span>weight: {pokemon.weight}</span>}
                            />
                          </ImageListItem>

                        )
                      )}
                    </ImageList>

                  </InfiniteScroll.Container>
                  <InfiniteScroll.Waypoint/>
                </>
              )}
            </div>
          </>
        )}
      </InfiniteScroll>
    </div>
  );
};
export default HomePage;
