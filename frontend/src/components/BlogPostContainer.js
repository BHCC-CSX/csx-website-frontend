import React, { Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import MyParallaxHeader from "./Headers/MyParallaxHeader";
import { Row, Col, Button, Container } from "reactstrap";

export default class BlogPostContainer extends Component {
  static propTypes = {
    blog: PropTypes.shape({}),
    user: PropTypes.shape({}),
    category: PropTypes.shape({}),
  };

  static defaultProps = {
    blog: {},
    user: null,
    category: null,
  };

  render() {
    return (
      <>
        {this.props.blog ? (
          <MyParallaxHeader
            headerImage={this.props.blog.image}
            headerText={this.props.blog.title}
          />
        ) : (
          <Skeleton width="100%" height="400px" />
        )}
        <div className="section">
          <Container>
            <Row>
              <Col md={12}>
                <div className="button-container">
                  <Button className="btn-primary btn-round btn-lg mr-1">
                    <i className="now-ui-icons users_single-02 pr-2"></i>
                    {this.props.user && (
                      this.props.user.first_name +
                      " " +
                      this.props.user.last_name
                    )}
                  </Button>

                  <Button className="btn-info btn-round btn-lg">
                    <i className="now-ui-icons shopping_tag-content pr-2"></i>
                    {this.props.category && (
                      this.props.category.name
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="section">
            <Container>
              <Row>
                <Col md={8} className="ml-auto mr-auto">
                  <p>
                    {this.props.blog.content || <Skeleton count={10}/>}
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}
