import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const MyNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
    <Container>
      <Navbar.Brand as={Link} to="/">
        BHCC CSX
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <LinkContainer exact to="/">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
          </LinkContainer>
          <LinkContainer exact to="/projects">
            <Nav.Item>
              <Nav.Link href="/projects">Projects</Nav.Link>
            </Nav.Item>
          </LinkContainer>
        </Nav>
        <Nav className="ml-auto navbar-right">
          <Navbar.Brand href="https://discord.gg/76xbjPA">
            <span className="fab fa-discord Nav-Icon Discord-Icon"></span>
          </Navbar.Brand>

          <Navbar.Brand href="https://github.com/BHCC-CSX">
            <span className="fab fa-github-square Nav-Icon"></span>
          </Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
