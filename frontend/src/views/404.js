import React, { Component } from "react";
import { Layout } from "./WrappedLayout";
import { Container } from "reactstrap";

// https://icons8.com/ouch/illustration/abstract-page-not-found

export class NotFound extends Component {

    render(){
        return(
            <>
                <Layout>
                    <Container className="content-center" style={{marginTop: "80px"}}>
                        <div className="section section-story-overview text-center">
                            <object type="image/svg+xml" data={"../404.svg"} height={500}>Your browser does not support SVG. :(</object>
                            <h1>Oops!</h1>
                            <h2 className={"lead"}>The resource you requested could not be found!</h2>
                        </div>
                    </Container>
                </Layout>
            </>
        );
    }
}