import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import MyFooter from "./components/Footers/MyFooter";
import Projects from "./views/Projects";
//import ProjectsDetail from "./views/ProjectsDetail";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route path="/projects" render={props => <Projects {...props} />} />
          </Route>
        </Switch>
      </BrowserRouter>
      <MyFooter />
    </>
  );
};

export default App;
