import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

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
        <Container>
          <h1>{title}</h1>
          <Row>
            <Col md={8}>
              <img alt="" class="card-img-top" src={image}></img>
            </Col>
            <Col md={4}>
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
        </Container>
      );
    } else {
      return null;
    }
  }
}
