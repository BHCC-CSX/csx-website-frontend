import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { Layout } from "./WrappedLayout";
import { axiosUnauth } from "../axios";
const queryString = require("query-string");

const Activate = (props) => {

    let location = useLocation()

    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const { uidb64, token } = queryString.parse(location.search)

        if (uidb64 && token) {
            axiosUnauth.post("/auth/user/activate/", { uidb64: uidb64, token: token })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        setSuccess(true)
                    } else {
                        setSuccess(false)
                    }
                }).catch(error => {
                    setSuccess(false)
                })
        }
    }, [location]);

    if (success == null) {
        return (
            <Layout>
                <Container style={{ paddingTop: "75px" }}>
                    <div className="section">
                        <div className="container">
                            <div className="row progress-container">
                                <div className="col-md-8 ml-auto mr-auto spinner">
                                    <Spinner color="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        )
    } else if (success) {
        return (
            <>
              <Layout transparent={false}>
                  <Container style={{ paddingTop: "75px" }}>
                    Your account has been activated. You may now <Link to='/login'>log in.</Link>
                  </Container>
              </Layout>
            </>
          );
    } else {
        return (
            <>
              <Layout transparent={false}>
                  <Container style={{ paddingTop: "75px" }}>
                    Account could not be activated.
                  </Container>
              </Layout>
            </>
          );
    }


}

export default Activate;