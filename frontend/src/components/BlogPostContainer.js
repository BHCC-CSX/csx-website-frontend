import React, { Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import MyParallaxHeader from "./Headers/MyParallaxHeader";
import { Row, Col, Button } from "reactstrap";

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
        {this.props.blog ? <MyParallaxHeader headerImage={this.props.blog.image} headerText={this.props.blog.title} /> : <Skeleton width="100%" height="400px" />}
        <div className="section">
          <Row>
            <Col md={12}>
              <div className="button-container">
                <Button className="btn-primary btn-round btn-lg">
                  <i className="now-ui-icons users_circle-08 text_align-left"></i>
                  {/* {this.props.user.first + " " + this.props.user.last} */}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
