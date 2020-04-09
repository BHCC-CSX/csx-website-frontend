import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ProjectCard from "../components/ProjectCard";
import { Layout } from "./WrappedLayout";

export default class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    fetch(process.env.REACT_APP_API_BASE_URL + "/projects/")
      .then(response => {
        return response.json();
      })
      .then(results => {
        this.setState({
          projects: results
        });
      });
  }

  renderCards() {
    if (this.state.projects != null) {
      return this.state.projects.map((project, index) => {
        return (
          <Col md={6} sm={10} xs={10} className="mx-auto d-flex" key={project.id}>
            <ProjectCard project={project} />
          </Col>
        );
      });
    } else {
      return null;
    }
  }

  renderPlaceHolders() {
    return (
      <React.Fragment>
        {Array(2)
          .fill()
          .map((item, index) => (
            <Col md={6} sm={10} xs={10} className="mx-auto d-flex" key={index}>
              <ProjectCard />
            </Col>
          ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <>
        <Layout transparent={false}>
          <Container style={{ paddingTop: "75px" }}>
            <h2 className="title">Projects</h2>
            <Row>
              {this.state.projects.length === 0
                ? this.renderPlaceHolders()
                : this.renderCards()}
            </Row>
          </Container>
        </Layout>
      </>
    );
  }
}
