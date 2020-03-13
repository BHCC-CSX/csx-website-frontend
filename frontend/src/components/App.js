import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { MyHeader } from "./MyNavbar";
import { withRouter } from "react-router";
import "../App.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const MyHeaderWithRouter = withRouter(props => <MyHeader {...props} />);
  return (
    <React.Fragment>
      <Router>
        <Layout className="Site">
          <MyHeaderWithRouter />
          <Content className="Site-Content" style={{ padding: "0px 50px" }}>
            <div className="site-layout-content">
              <p>
                Something Here<br></br>
              </p>
            </div>
          </Content>
          <Footer>
            <p style={{ textAlign: "center" }}>
              &copy; BHCC Computer Science Exchange 2020
            </p>
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
  );
};

export default App;
