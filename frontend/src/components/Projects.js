import React, { Component } from "react";
import { CardDeck, Card, Container } from "react-bootstrap";

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
        <Card>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <Card.Footer>{technology}</Card.Footer>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container>
        <CardDeck>{this.renderCards()}</CardDeck>
      </Container>
    );
  }
}
