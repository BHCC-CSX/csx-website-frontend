import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router";

const { Header, Content, Footer } = Layout;

export const MyHeader = props => {
  const { location } = props;
  return(
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys = {[location.pathname]}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="/projects"><Link to="/projects">Projects</Link></Menu.Item>
    </Menu>
  </Header>
)};

