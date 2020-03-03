import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export const MyNavbar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>BHCC Computer Science Exchange</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/projects">
          Projects
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
);
