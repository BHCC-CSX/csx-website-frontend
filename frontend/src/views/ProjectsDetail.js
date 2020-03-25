import React, { Component } from "react";
import { Layout } from "./WrappedLayout";
import { Row, Col, Container } from "reactstrap";

export default class ProjectsDetail extends Component {
  state = {
    project: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id != null) {
      fetch(process.env.REACT_APP_API_BASE_URL + `/projects/${id}`)
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
          this.setState({
            project: result
          });
        });
    }
  }

  render() {
    if (this.state.project != null) {
      const {
        title,
        description,
        technology,
        coordinator,
        coordinator_email,
        link,
        image
      } = this.state.project;

      return (
        <Layout>
          <Container style={{ paddingTop: "75px", paddingBottom: "15px" }}>
            <div className="section section-story-overview">
              <Row>
                <Col md="6">
                  <h1>{title}</h1>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage: "url('" + image + "')"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <h5>About the project:</h5>
                  <p>{description}</p>
                  <br />
                  <h5>Technology used:</h5>
                  <p>{technology}</p>
                  <br />
                  <h5>Coordinator:</h5>
                  <p>{coordinator}</p>
                  <br />
                  <h5>Coordinator email:</h5>
                  <p>{coordinator_email}</p>
                  <br />
                  <h5>
                    <a href={link}>Github</a>
                  </h5>
                </Col>
              </Row>
            </div>
          </Container>
        </Layout>
      );
    } else {
      return null;
    }
  }
}
