import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";

import mapDispatchToProps from "../../redux/mapDispatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import useStyles from "./homePageStyle";
import Footer from "../../componets/footer";
import Header from "../../componets/header";
import Card from "../../componets/elements/card";

const Home = (props: any) => {
  const classes = useStyles();
  const { cars, getAllCars, logout, currentUser, me } = props;

  useEffect(() => {
    getAllCars();
    currentUser();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header logout={logout} currentUser={me} />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              The application allows you to have a list of cars
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              The application allows you to have a list of cars. Each user can
              comment on a car. The user who is not logged in can see the list
              but not the comments. You should only be able to access comments
              if you are logged in.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cars.map((item: any) => (
              <Card datas={item} />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
