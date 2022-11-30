import {
  Accordion, AccordionDetails,
  AccordionSummary,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme, Typography
} from "@material-ui/core";
import React from "react";
import {Pokemon} from "../../features/pokeSlice";
import {ExpandMore} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      padding: theme.spacing(0.5),
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(0.5),
    },
    root: {
      width: '70%',
    },
    paper: {
      padding: theme.spacing(0.5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(0.5),
    },
    divider: {
      margin: theme.spacing(1, 0),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
  }),
);

type Props = {
  pokemon: Pokemon;
};

export const PokeMoves = ({pokemon}: Props) => {
  const classes = useStyles();

  return <div className={classes.root}>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Moves ({pokemon.moves.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {pokemon.moves.map(move => (
            <Grid item xs={1}>
              <Paper className={classes.paper}>{move.move.name}</Paper>
            </Grid>
          ))}

        </Grid>
      </AccordionDetails>
    </Accordion>

  </div>
}

export default PokeMoves;
