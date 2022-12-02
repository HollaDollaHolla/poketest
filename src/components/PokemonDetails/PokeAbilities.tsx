import React from "react";
import {Pokemon} from "../../features/pokeSlice";
import {Button, ButtonGroup} from "@material-ui/core";

type Props = {
  pokemon: Pokemon;
};

export const PokeAbilities = ({pokemon}: Props) => {

  return <div>
    <span>Abilities:</span>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      {pokemon.abilities?.map((ability, i) => <Button key={i}>
        { ability.isHidden ? (<span><s>{ability.ability.name}</s></span>) : (<span>{ability.ability.name}</span>) }
      </Button>)}
    </ButtonGroup>
  </div>
}

export default PokeAbilities;
