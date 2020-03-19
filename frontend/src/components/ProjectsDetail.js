import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default class ProjectsDetail extends Component {
  state = {
    project: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id != null) {
      fetch(`/api/projects/${id}`)
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
        <Row>
          <Col className="md-8">
            <img class="card-img-top" src={image}></img>
          </Col>
          <Col className="md-4">
            <h1>{title}</h1>
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
      );
    } else {
      return null;
    }
  }
}
