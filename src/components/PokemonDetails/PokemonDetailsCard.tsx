import {Box, createStyles, Grid, ImageListItem, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";
import PokeAbilities from "./PokeAbilities";
import PokeMoves from "./PokeMoves";
import PokeStats from "./PokeStats";
import React from "react";
import {Pokemon} from "../../features/pokeSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PokemonDetailsCard: {},
    PokemonDetailsCardContent: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      [theme.breakpoints.up('sm')]: {
        paddingLeft: 0,
      },
    },
    backLink: {
      display: 'block',
      width: 32,
      height: 32,
      color: theme.palette.text.primary,
      marginLeft: 16,

      '& svg': {
        width: '100%',
        height: '100%',
        fill: 'currentColor'
      }
    },
    PokemonDetailsImg: {
      width: '100%',
      height: 'auto'
    },
  }),
);

export const PokemonDetailsCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const classes = useStyles();

  return <Paper className={classes.PokemonDetailsCard}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Link to={'/poketest'} className={classes.backLink}>
          <ArrowBack/>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
        <img className={classes.PokemonDetailsImg}
             src={pokemon.img}
             alt={pokemon.name}
             loading="lazy" />
      </Grid>
      <Grid item xs={12} sm={6} md={7}>
        <Box className={classes.PokemonDetailsCardContent}>
          <Typography variant={'h3'}>
            #{pokemon.id} - {pokemon.name}
          </Typography>

          <PokeAbilities pokemon={pokemon}/>
          <PokeMoves pokemon={pokemon}/>
          <PokeStats pokemon={pokemon}/>
        </Box>
      </Grid>
    </Grid>
  </Paper>
}

export default PokemonDetailsCard;
