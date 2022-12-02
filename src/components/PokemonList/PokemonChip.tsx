// it's an example how to use enums as dynamic types
import {EnumHelper} from "../../utils/EnumUtil";
import {PokeTypeColors} from "../../features/types";
import {Chip, createStyles, makeStyles, Theme} from "@material-ui/core";
import React from "react";

const colorObject = EnumHelper.enumToObject<PokeTypeColors>(PokeTypeColors, [], true)

const getTypeBackgroundColor = (type: string): string => {
  return colorObject[type] || '#ffffff'
}

const usePokemonChipStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelSmall: (color: { bgColor?: string }) => ({
      paddingLeft: '8px',
      paddingRight: '8px',
      backgroundColor: getTypeBackgroundColor(color?.bgColor || theme.palette.primary.main),
      margin: '0 4px',
    })
  }),
);

export const PokemonChip = ({ name }: { name: string }) => {
  const props = { bgColor: name };
  const classes = usePokemonChipStyles(props);

  return <Chip color={'primary'}
               size={'small'}
               label={name}
               className={classes.labelSmall} />
}

export default PokemonChip;
