import Typography from "@material-ui/core/Typography";

import Copyright from "../../componets/elements/copyright";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        MY CARS
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Fullstack Test
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
