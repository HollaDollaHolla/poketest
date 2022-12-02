import { Link } from "react-router-dom";
import {AppBar, createStyles, makeStyles, Slide, Theme, Toolbar, useScrollTrigger} from "@material-ui/core";
import Logo from '../../../assets/images/pokemon_logo.webp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
    },
    regular: {
      minHeight: 'var(--header-h)',
    },
    HeaderLogo: {
      display: 'block',
      width: '48px',
      height: '48px',
      margin: 'auto'
    },
    HeaderLogoImg: {
      width: '100%',
      height: '100%',
    }
  })
);

export const Header = (props: any) => {
  const { window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const classes = useStyles();

  return <Slide appear={false} direction="down" in={!trigger}>
    <AppBar className={classes.colorPrimary}>
      <Toolbar className={classes.regular}>
        <Link className={classes.HeaderLogo} to={'/poketest'}>
          <img className={classes.HeaderLogoImg} src={Logo} alt=""/>
        </Link>
      </Toolbar>
    </AppBar>
  </Slide>
}

export default Header;
