import {useSelector} from "react-redux";
import InfiniteScroll from "../../components/InfiniteScroll";
import {getPokemons, Pokemon, pokemonsSelector} from "../../features/pokeSlice";
import {cachedPokemonsSelector} from "../../features/pokeListSlice";
import PokeListSearchForm from "../../components/PokeListSearchForm";

const HomePage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  const itemsPerPage = 15;

  return (
   <div>
      <InfiniteScroll
        totalCount={cachedPokemons.data.length}
        itemsPerPage = {itemsPerPage}
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
        {({ mutatePage }) => (
          <>
            <div >
              <PokeListSearchForm
                mutatePage={mutatePage}
              />
            </div>
            <div >
              {!(
                cachedPokemons.status.state === "LOADING" ||
                cachedPokemons.status.state === "INITIAL"
              ) && (
                <>
                  <InfiniteScroll.Container>
                    {pokemons.data.map((pokemon, index) =>
                      pokemon === null || pokemon.empty ? (
                        <div>
                          notLoaded {pokemon?.id}
                        </div>
                      ) : (
                        <div>
                          loaded: {pokemon.id}. name: {pokemon.name}
                        </div>
                      )
                    )}
                  </InfiniteScroll.Container>
                  <InfiniteScroll.Waypoint />
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
