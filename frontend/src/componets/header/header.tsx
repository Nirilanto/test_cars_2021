import { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useStyles from "./headerStyle";
import AuthService from "../../services/AuthService";

export default function ButtonAppBar(props: any) {
  const { logout, currentUser } = props;
  const { name } = currentUser || {};
  const classes = useStyles();
  let history = useHistory();

  const [isAuth, setIsAuth] = useState(AuthService.isAuthenticated());

  async function handleClick() {
    isAuth ? await logout() : history.push("/login");
    setIsAuth(AuthService.isAuthenticated());
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={() => history.push("/")}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Cars
          </Typography>

          <div>
            {isAuth && (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <label className={classes.nameuser}>{name}</label>
              </>
            )}
            <Button color="inherit" onClick={handleClick}>
              {isAuth ? "Logout" : "Login"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
