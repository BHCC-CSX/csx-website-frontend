import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

export default class DetailContainer extends Component {
    static propTypes = {
        project: PropTypes.shape({})
      };
    
    static defaultProps = {
        project: {}
      };

    render(){
        const {
            title,
            description,
            technology,
            coordinator,
            coordinator_email,
            link,
            image
          } = this.props.project;
        return(
            <Container style={{ paddingTop: "75px", paddingBottom: "15px" }}>
                <div className="section section-story-overview">
                <Row>
                    <Col md="6">
                    <h1>{title || <Skeleton />}</h1>
                    <div
                        className="image-container"
                        style={{
                        backgroundImage: "url('" + image + "')"
                        }}
                    >{image? null : <div className="lh-0"><Skeleton width={540} height={335}/></div>}</div>
                    </Col>
                    <Col md="5">
                    <h5>About the project:</h5>
                    <p>{description || <Skeleton count={2} />}</p>
                    <br />
                    <h5>Technology used:</h5>
                    <p>{technology || <Skeleton />}</p>
                    <br />
                    <h5>Coordinator:</h5>
                    <p>{coordinator || <Skeleton />}</p>
                    <br />
                    <h5>Coordinator email:</h5>
                    <p>{coordinator_email || <Skeleton />}</p>
                    <br />
                    <h5>
                        {link ? <a href={link}>Github</a> : <Skeleton width={125}/>}
                    </h5>
                    </Col>
                </Row>
                </div>
            </Container>
          );
    }
};