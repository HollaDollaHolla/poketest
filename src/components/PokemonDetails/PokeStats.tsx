import {Pokemon} from "../../features/pokeSlice";
import {Box, Typography} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

import React from "react";

type Props = {
  pokemon: Pokemon;
};

export const PokeStats = ({pokemon}: Props) => {

  return <div>
    <span>Stats:</span>
    { pokemon.stats.map(stat =>
      ( <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">{stat.stat.name}</Typography>
        <Rating  value={stat.baseStat / 10} size="small" precision={0.1} max={10} readOnly={true}/>
      </Box>)
    )}
  </div>
}

export default PokeStats;
