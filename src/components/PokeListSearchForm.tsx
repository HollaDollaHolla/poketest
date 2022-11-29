import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {pokemonsSelector, resetPokemonsReducer} from "../features/pokeSlice";
import {searchPokemonsByNameReducer} from "../features/pokeListSlice";

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

  const submitFormHandler = () => {
    if (!isLoading) {
      dispatch(resetPokemonsReducer({}));
      dispatch(searchPokemonsByNameReducer({ pokemonName: value }));
      mutatePage(0);
    }
  };

  return (
    <div >
      <div >

        <input
          placeholder={"Search an item..."}
          value={value}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              submitFormHandler();
            }
          }}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setValue(e.currentTarget.value)
          }
        />
      </div>

      <button
        onClick={submitFormHandler}
      >
        Search
      </button>
    </div>
  );
};

export default PokeListSearchForm;
