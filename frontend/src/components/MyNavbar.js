import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MyNavbar = (props) => {
  const {transparent, scroll} = props
  var claName = (transparent ? (window.pageYOffset < scroll ? "navbar-transparent": "") : "");
  var scrol = (window.pageYOffset > scroll ? scroll-window.pageYOffset : scroll)

  console.log(window.pageYOffset)

  return(
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className={claName} color-on-scroll={scroll === "" ? undefined : scrol} >
      <Container>
        <Navbar.Brand as={Link} to="/">
          BHCC CSX
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto navbar-right">
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
            <Navbar.Brand
              className="icon-brand"
              href="https://discord.gg/76xbjPA"
            >
              <span className="fab fa-discord nav-icon discord-icon" style={{"height": "20px"}}></span>
            </Navbar.Brand>

            <Navbar.Brand
              className="icon-brand"
              href="https://github.com/BHCC-CSX"
            >
              <span className="fab fa-github-square nav-icon" style={{"height": "20px"}}></span>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
