import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export const MyNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
    <div className="container">
      <div className="navbar-header">
        <Navbar.Brand as={Link} to="/">
          BHCC Computer Science Exchange
        </Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* className="navbar navbar-default navbar-expand-lg navbar-dark bg-dark fixed-top" */}
          <Container>
            <div className="collapse navbar-collapse">
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
            </div>
          </Container>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);
