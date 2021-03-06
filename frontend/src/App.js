import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Projects from "./views/Projects";
import ProjectsDetail from "./views/ProjectsDetail";
import Blog from "./views/Blog";
import BlogDetail from "./views/BlogDetail";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Activate from "./views/Activate";
import Account from "./views/Account";
import BlogForm from "./views/BlogForm";
import ProtectedRoute from "./components/ProtectedRoute";
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
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/signup" render={props => <Signup {...props} />} />
            <Route path="/activate" render={props => <Activate {...props} />} />
            <ProtectedRoute path="/account" component={Account} />
            <ProtectedRoute path="/blog/create" render={props => <BlogForm {...props} edit={false} />} />
            <ProtectedRoute path="/blog/edit/:id" render={props => <BlogForm {...props} edit={true} />} />
            <Route path="/404" render={props => <NotFound {...props} />} />
            <Route render={props => <NotFound {...props} />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
