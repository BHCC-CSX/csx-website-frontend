import React from "react";
import { Link } from "react-router-dom";
import { withContext } from "../../AppContext";

import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

const MyNavbar = props => {
  // State Management
  const scroll = props.scroll;
  const transparent = props.transparent || false;
  const [navbarColor, setNavbarColor] = React.useState(
    transparent ? "navbar-transparent" : ""
  );
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = transparent => {
      if (
        document.documentElement.scrollTop > scroll - 1 ||
        document.body.scrollTop > scroll - 1
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
    }
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
      <Navbar
        className={"fixed-top " + navbarColor}
        color="primary"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavLink tag={Link} to="/" id="navbar-brand">
              BHCC CSX
            </NavLink>
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
              <NavItem className="pt-1" active={window.location.pathname === '/'}>
              <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem className="pt-1" active={window.location.pathname.includes('/projects')}>
                <NavLink to="/projects" tag={Link}>
                  Projects
                </NavLink>
              </NavItem>
              <NavItem className="pt-1" active={window.location.pathname.includes('/blog')}>
                <NavLink to="/blog" tag={Link}>
                  Blog
                </NavLink>
              </NavItem>

              {
                !props.access_token ?
                  <React.Fragment>
                    <NavItem className="pt-1" active={window.location.pathname.includes('/login')}>
                      <NavLink to="/login" tag={Link}>
                        Sign In
                      </NavLink>
                    </NavItem>
                    <NavItem className="pt-1" active={window.location.pathname.includes('/signup')}>
                      <NavLink to="/signup" tag={Link}>
                        Sign Up
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                :
                  <React.Fragment>
                    <NavItem className="pt-1" active={window.location.pathname.includes('/account')}>
                      <NavLink to="/account" tag={Link}>
                        Account
                      </NavLink>
                    </NavItem>
                    <NavItem className="pt-1" active={window.location.pathname.includes('/logout')}>
                      <NavLink onClick={props.logout} to="/" tag={Link}>
                        Log Out
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
              }
              <NavItem className="pt-1">
                <NavLink
                  href="https://discordapp.com/invite/76xbjPA"
                  target="_blank"
                  rel="noopener"
                  id="discord-link"
                  className="pb-0"
                >
                  <i className="fab fa-discord nav-icon discord-icon"></i>
                  <p className="d-lg-none d-xl-none sidebar-label">Discord</p>
                </NavLink>
                <UncontrolledTooltip target="#discord-link">
                  Join the Discord!
                </UncontrolledTooltip>
              </NavItem>
              <NavItem className="pt-1">
                <NavLink
                  href="https://github.com/BHCC-CSX"
                  target="_blank"
                  rel="noopener"
                  id="github-tooltip"
                  className="pb-0"
                >
                  <i className="fab fa-github-square nav-icon"></i>
                  <p className="d-lg-none d-xl-none sidebar-label">GitHub</p>
                </NavLink>
                <UncontrolledTooltip target="#github-tooltip">
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

export default withContext(MyNavbar);
