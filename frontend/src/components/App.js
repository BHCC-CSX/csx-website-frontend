import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyNavbar } from "./MyNavbar";
import Home from "./Home";
import Projects from "./Projects";
import ProjectsDetail from "./ProjectsDetail";
import "../App.css";

const App = () => (
  <React.Fragment>
    <Router>
      <MyNavbar />
      <main role="main" className="flex-shrink-0">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path={`/projects/:id`} component={ProjectsDetail} />
          {/* <Route
          exact
          path="/accounts"
          render={props => (
            <AccountTable {...props} endpoint="127.0.0.1:8000/accounts" />
          )}
        />
        <Route exact path="/details" component={Details} /> */}
        </Switch>
      </main>
      <footer className="footer mt-auto pt-4 pb-2 bg-dark text-white">
        <div className="container">
          <p style={{ textAlign: "center" }}>
            &copy; BHCC Computer Science Exchange 2020
          </p>
        </div>
      </footer>
    </Router>
  </React.Fragment>
);

export default App;
