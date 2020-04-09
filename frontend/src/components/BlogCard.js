import React, { Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Row, Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

export default class BlogCard extends Component {
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
    const { id, title, image, content } = this.props.blog;
    return (
      <Card className="card-plain">
        <Row>
          <div className="col-md-4">
            {image ? (
              <div className="card-image">
                <CardImg alt="" src={image} className="img-raised rounded" />
              </div>
            ) : (
              <div className="lh-0">
                <Skeleton height={200} />
              </div>
            )}
          </div>
          <div className="col-md-8 pt-3">
            <h3 className="card-title">
              {title ? (
                <Link to={`/blog/posts/${id}`} style={{ color: "#444" }}>
                  {title}
                </Link>
              ) : (
                <Skeleton />
              )}
            </h3>
            {content ? (
              <p className="card-description">
                {content.length < 200
                  ? content
                  : content.substr(0, 199) + "... "}
                <Link to={`/blog/posts/${id}`} style={{ color: "#444" }}>
                  Read More
                </Link>
              </p>
            ) : (
              <Skeleton count={5} />
            )}
            <div>
              {this.props.user !== null ? (
                <span>
                  {this.props.user.first_name + " " + this.props.user.last_name}
                </span>
              ) : (
                <Skeleton width="30%" />
              )}
              {this.props.category !== null ? (
                <Link to="#" className="pull-right">
                  {this.props.category.name}
                </Link>
              ) : (
                <div className="pull-right">
                  <Skeleton width="50px" />
                </div>
              )}
            </div>
          </div>
        </Row>
      </Card>
    );
  }
}
