import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export const MyNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
    <Container>
      <Navbar.Brand as={Link} to="/">
        BHCC CSX
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Item as={NavLink} exact to="/" className="Navbar-Link">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as={NavLink} exact to="/projects" className="Navbar-Link">
            <Nav.Link as={Link} to="/projects">
              Projects
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="ml-auto navbar-right">
          <Navbar.Brand href="https://discord.gg/76xbjPA">
            <Nav.Link className="fab fa-discord Nav-Icon Discord-Icon"></Nav.Link>
          </Navbar.Brand>

          <Navbar.Brand href="https://github.com/BHCC-CSX">
            <Nav.Link className="fab fa-github-square Nav-Icon"></Nav.Link>
          </Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
