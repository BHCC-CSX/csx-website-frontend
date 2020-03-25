import React from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

const MyNavbar = (props) => {
  // State Management
  const scroll = props.scroll;
  const transparent = props.transparent || false
  const [navbarColor, setNavbarColor] = React.useState(transparent ? "navbar-transparent" : "");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = (transparent) => {
      if (
        document.documentElement.scrollTop > scroll-1 ||
        document.body.scrollTop > scroll-1
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < scroll ||
        document.body.scrollTop < scroll
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    if (transparent) {
      window.addEventListener("scroll", updateNavbarColor);
      return function cleanup() {
        window.removeEventListener("scroll", updateNavbarColor);
      };
    };
  }, [transparent, scroll]);

  // Component
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="primary" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="/"
              target="_blank"
              id="navbar-brand"
            >
              BHCC CSX
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/projects">
                  Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://twitter.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="discord-link"
                >
                  <i className="fab fa-discord nav-icon discord-icon"></i>
                  <p className="d-lg-none d-xl-none">Discord</p>
                </NavLink>
                <UncontrolledTooltip target="#discord-link">
                  Join the Discord!
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-github-square nav-icon"></i>
                  <p className="d-lg-none d-xl-none">GitHub</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Check us out on github.
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );


};

export default MyNavbar;
