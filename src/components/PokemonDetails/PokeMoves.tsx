import {
  Accordion, AccordionDetails,
  AccordionSummary, Chip,
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
    PokeMoves: {
      marginBottom: 24,
    },
    container: {
      display: 'grid',
      padding: theme.spacing(0.5),
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(0.5),
    },
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    paper: {
      padding: theme.spacing(0.5),
      // textAlign: 'center',
      // color: theme.palette.text.secondary,
      // whiteSpace: 'nowrap',
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

  return <div className={classes.PokeMoves}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Moves ({pokemon.moves.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.root}>
          {pokemon.moves.map(move => <Chip key={move.move.name}
                                           color={'primary'}
                                           size={'small'}
                                           label={move.move.name}
                                           className={classes.paper} />)}
        </div>
      </AccordionDetails>
    </Accordion>

  </div>
}

export default PokeMoves;
