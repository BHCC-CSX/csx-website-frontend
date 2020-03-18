import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

export default class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/projects/")
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
    return this.state.projects.map((project, index) => {
      const { title, description, technology, image } = project;
      return (
        <Col className="md-4 sm-2 d-flex">
          <Card className="mb-4 fixed-width-card">
            <Card.Img variant="top" className="fixed-image" src={image} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Button className="mt-auto mr-auto align-self-end">
                Read More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  render() {
    return (
      <Container>
        <h1>Projects</h1>
        <Row>{this.renderCards()}</Row>
      </Container>
    );
  }
}
