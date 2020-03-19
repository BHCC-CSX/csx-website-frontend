import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    fetch("/api/projects/")
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
      const { id, title, description, image } = project;
      return (
        <Col md={6} sm={10} xs={10} className="mx-auto d-flex">
          <Card className="mb-4">
            <Card.Img variant="top" className="fixed-image" src={image} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Button className="mt-auto mr-auto align-self-end">
                <Link to={`/projects/${id}`}>Read More</Link>
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
