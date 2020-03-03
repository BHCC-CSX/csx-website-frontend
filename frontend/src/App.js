import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyNavbar } from "./MyNavbar";

const App = () => (
  <React.Fragment>
    <Router>
      <MyNavbar />

      <Switch>
        {/* <Route
          exact
          path="/"
          render={props => (
            <CustomerTable {...props} endpoint="127.0.0.1:8000/customers" />
          )}
        />
        <Route
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
