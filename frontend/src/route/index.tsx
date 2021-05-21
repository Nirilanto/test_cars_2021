import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../pages/HomePage/homePage";
import SinglePage from "../pages/SinglePage/singlePage";
import LoginPage from "../pages/AuthPage/login/login";
import SignupPage from "../pages/AuthPage/signup/sugnup";

const RootApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/signup" component={SignupPage}></Route>
        <Route path="/show/:id" component={SinglePage}></Route>
        <Route path="/" component={HomePage}></Route>
      </Switch>
    </Router>
  );
};

export default RootApp;
