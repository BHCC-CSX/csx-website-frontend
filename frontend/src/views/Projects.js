import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
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
        const { id, title, description, image } = project;
        return (
          <Col md={6} sm={10} xs={10} className="mx-auto d-flex" key={id}>
            <Card className="mb-4">
              <CardImg
                alt=""
                variant="top"
                className="fixed-image"
                src={image}
              />
              <CardBody className="d-flex flex-column">
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
                <Button
                  as={Link}
                  href={`/projects/${id}`}
                  className="mt-auto mr-auto align-self-end"
                  color="primary"
                >
                  Read More
                </Button>
              </CardBody>
            </Card>
          </Col>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <>
        <Layout transparent={false}>
          <Container style={{ paddingTop: "75px" }}>
            <h1>Projects</h1>
            <Row>{this.renderCards()}</Row>
          </Container>
        </Layout>
      </>
    );
  }
}
