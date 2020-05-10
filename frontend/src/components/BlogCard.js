import React, { Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Row, Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { id, title, image, content } = props.blog;

  const [modalLive, setModalLive] = React.useState(false);

  const handleDelete = (id) => {
    // this has to use the axiosInstance
    props.deletePost(id)
    setModalLive(false)
    window.location.reload()
  }

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
                <br></br>
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
                <Link to={`/blog/categories/${this.props.blog.category}`} className="pull-right">
                  {this.props.category}
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
        
        <Modal className="modal-sm" toggle={() => setModalLive(false)} isOpen={modalLive}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLiveLabel">
              Delete Post
            </h5>
            <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={() => setModalLive(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this post?</p>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              type="button"
              onClick={() => setModalLive(false)}
            >
              Close
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={() => handleDelete(props.blog.id)}
            >
              Delete
            </Button>
          </div>


        </Modal>
      </>
    );
  }
BlogCard.propTypes = {
  editable: PropTypes.bool,
  blog: PropTypes.shape({}),
  user: PropTypes.shape({}),
  category: PropTypes.string,
};

BlogCard.defaultProps = {
  editable: false,
  blog: {},
  user: null,
  category: null,
};

export default withContext(BlogCard);