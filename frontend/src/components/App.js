import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { MyHeader } from "./MyNavbar";
import {withRouter} from "react-router";

const {Header, Content, Footer} = Layout;

const App = () => {
  const MyHeaderWithRouter = withRouter(props => <MyHeader {...props}/>);
  return (
  <React.Fragment>
    <Router>
      <Layout className="layout">
        <MyHeaderWithRouter />
        <Content style={{ padding: '20px 50px' }}>
          <div className="site-layout-content">
            <p>Something Here</p>
          </div>
        </Content>
        <Footer>
          <p> Feet </p>
        </Footer>
      </Layout>

      <Switch>
        <Route exact path="/"></Route>
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
)}

export default App;
