import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import mapDispatchToProps from "src/redux/mapDispatchToProps";
import mapStateToProps from "src/redux/mapStateToProps";
import useStyles from "./loginStyle";
import Copyright from "src/componets/elements/copyright";
import AuthService from "src/services/AuthService";

const LoginPage = (props: any) => {
  const { login } = props;
  let history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({});

  function checkAuth() {
    AuthService.isAuthenticated() && history.push("/");
  }

  function handleClickHome() {
    history.push("/");
  }

  const handleChange = (elem: any) => {
    const { name, value } = elem.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { succes, label } = await login({ ...data });
    !succes &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: label,
      });

    checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            defaultValue=""
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handleChange}
            defaultValue=""
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClickHome}
          >
            HomePage
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
