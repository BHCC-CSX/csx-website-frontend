import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Projects from "./views/Projects";
import ProjectsDetail from "./views/ProjectsDetail";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route exact path="/projects" render={props => <Projects {...props} />} />
            <Route path={"/projects/:id"} render={props => <ProjectsDetail {...props} />} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
