import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Projects from "./views/Projects";
import ProjectsDetail from "./views/ProjectsDetail";
import Blog from "./views/Blog";
import BlogDetail from "./views/BlogDetail";
import Login from "./views/Login";
import { NotFound } from "./views/404";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route exact path="/projects" render={props => <Projects {...props} />} />
            <Route path="/projects/:id" render={props => <ProjectsDetail {...props} />} />
            <Route exact path="/blog" render={props => <Blog {...props} />} />
            <Route path="/blog/categories/:id" render={props => <Blog {...props} />} />
            <Route path="/blog/posts/:id" render={props => <BlogDetail {...props} />} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/404" render={props => <NotFound {...props} />} />
            <Route render={props => <NotFound {...props} />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
