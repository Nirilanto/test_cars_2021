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
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import mapDispatchToProps from "../../../redux/mapDispatchToProps";
import mapStateToProps from "../../../redux/mapStateToProps";
import useStyles from "./signupStyle";
import Copyright from "../../../componets/elements/copyright";
import AuthService from "../../../services/AuthService";

const SingupPage = (props: any) => {
  const { login, signup } = props;
  const classes = useStyles();
  let history = useHistory();
  const [data, setData] = useState({});
  const [pwConf, setPwConf] = useState("");

  let isSamePw = Object.assign({ ...data }).password == pwConf;

  function checkAuth() {
    AuthService.isAuthenticated() && history.push("/");
  }

  const handleChange = (elem: any) => {
    const { name, value } = elem.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!isSamePw)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Confirm Password Field",
      });
    const { succes, label } = await signup({ ...data, login: "blank" });
    if (!succes)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: label,
      });
    await login({ ...data });
    checkAuth();
  };

  function handleClickHome() {
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e: any) => setPwConf(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="passwordCf"
                error={!isSamePw}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SingupPage);
