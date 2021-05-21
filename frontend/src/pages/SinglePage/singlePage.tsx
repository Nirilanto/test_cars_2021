import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";

import mapDispatchToProps from "../../redux/mapDispatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import useStyles from "./singlePageStyle";
import Footer from "../../componets/footer";
import Header from "../../componets/header";
import Comment from "../../componets/comment/comment";

const SinglePage = (props: any) => {
  const classes = useStyles();
  const { cars, getAllComment, logout, me , currentUser} = props;

  useEffect(() => {
    currentUser()
    getAllComment();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header logout={logout} currentUser={me} />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Comment id={props.match?.params?.id ?? ""} />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
