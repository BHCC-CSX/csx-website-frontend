/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function MyFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://bhcc.edu"
                target="_blank"
              >
                BHCC WEBSITE
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, BHCC Computer Science Exchange
        </div>
      </Container>
    </footer>
  );
}

export default MyFooter;