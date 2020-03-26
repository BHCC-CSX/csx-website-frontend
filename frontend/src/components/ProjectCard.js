import React, { Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

export default class ProjectCard extends Component {
  static propTypes = {
    project: PropTypes.shape({})
  };

  static defaultProps = {
    project: {}
  };

  render() {
    const { id, title, image, description } = this.props.project;
    return (
      <Card className="mb-4 d-flex">
        {image ? (
          <CardImg alt="" variant="top" className="fixed-image" src={image} />
        ) : (
          <Skeleton height={200} />
        )}
        <CardBody className="d-flex flex-column">
          <CardTitle>{title || <Skeleton />}</CardTitle>
          <CardText>{description || <Skeleton count={2} />}</CardText>
          {id ? (
            <Button
              tag={Link}
              to={`/projects/${id}`}
              className="mt-auto mr-auto align-self-end"
              color="primary"
            >
              Read More
            </Button>
          ) : (
            <Skeleton height={38} width={108} />
          )}
        </CardBody>
      </Card>
    );
  }
}
