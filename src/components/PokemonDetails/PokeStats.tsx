import {Pokemon} from "../../features/pokeSlice";
import {Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

import React from "react";

type Props = {
  pokemon: Pokemon;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PokeStats: {
      marginBottom: 24,
    },
    PokeStatsTitle: {
      marginBottom: 8,
    },
    PokeStatsBox: {
      marginBottom: 0,
    }
  }),
);

export const PokeStats = ({ pokemon }: Props) => {
  const classes = useStyles();

  return pokemon ? <div className={classes.PokeStats}>
    <Typography variant={'h5'} className={classes.PokeStatsTitle}>Stats:</Typography>
    <Grid container spacing={2}>
      { pokemon.stats.map(stat => <Grid key={stat.stat.name} item xs={12} md={6}>
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.PokeStatsBox}>
            <Typography component="legend" variant={'h6'}>{stat.stat.name}</Typography>
            <Rating value={stat.baseStat / 10} size="small" precision={0.1} max={10} readOnly={true}/>
          </Box>
        </Grid>
      )}
    </Grid>
  </div> : null
}

export default PokeStats;
