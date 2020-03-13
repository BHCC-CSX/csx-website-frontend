import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header } = Layout;

export const MyHeader = props => {
  const { location } = props;
  return (
    <Header>
      <div
        className="Nav-logo"
        style={{
          backgroundImage: "url(" + process.env.PUBLIC_URL + "/logo.png)",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
      ></div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/projects">
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item style={{ float: "right" }}>
          <a
            href="https://discord.gg/76xbjPA"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Discord"
          >
            <i className="fab fa-discord Nav-icon"></i>
          </a>
          <a
            href="https://github.com/BHCC-CSX"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Github"
          >
            <i class="fab fa-github-square Nav-icon"></i>
          </a>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
