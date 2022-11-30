import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    DetailsPage: {
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      // justifyContent: 'center',
      padding: '24px 0',
      minHeight: 'calc(100vh - 64px)',
    },
  }),
);

export const DetailsPage = () => {
  const classes = useStyles();

  return <div className={classes.DetailsPage}>DetailsPage</div>
}

export default DetailsPage;
