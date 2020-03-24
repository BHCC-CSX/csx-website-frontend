import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    return this.state.projects.map((project, index) => {
      const { id, title, description, image } = project;
      return (
        <Col md={6} sm={10} xs={10} className="mx-auto d-flex" key={id}>
          <Card className="mb-4">
            <Card.Img
              alt=""
              variant="top"
              className="fixed-image"
              src={image}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Button
                as={Link}
                to={`/projects/${id}`}
                className="mt-auto mr-auto align-self-end"
              >
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
      <Container style={{paddingTop: "70px"}}>
        <h1>Projects</h1>
        <Row>{this.renderCards()}</Row>
      </Container>
    );
  }
}
