import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyNavbar } from "./MyNavbar";
import Home from "./Home";
import Projects from "./Projects";
import "../App.css";

const App = () => (
  <React.Fragment>
    <Router>
      <MyNavbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        {/* <Route
          exact
          path="/accounts"
          render={props => (
            <AccountTable {...props} endpoint="127.0.0.1:8000/accounts" />
          )}
        />
        <Route exact path="/details" component={Details} /> */}
      </Switch>
    </Router>
  </React.Fragment>
);

export default App;
