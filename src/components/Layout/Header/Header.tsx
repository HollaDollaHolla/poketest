import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Logo from '../../../assets/images/pokemon_logo.webp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Header: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#434a57',
      display: 'flex',
      alignItems: 'center',
      height: '64px',
      zIndex: 1,
      padding: '0 16px',
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

export const Header = () => {
  const classes = useStyles();

  return <header className={classes.Header}>
    <Link className={classes.HeaderLogo} to={'/'}>
      <img className={classes.HeaderLogoImg} src={Logo} alt=""/>
    </Link>
  </header>
}

export default Header;
