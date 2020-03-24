import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";

const Home = (props) => {
  const {setTrans} = props 
  useEffect(() => {
    setTrans(true, "400"); 
    return function cleanup(){
      setTrans(false, "");
    }}, [setTrans]);

  return (
    <div className="wrapper">
      <div className="page-header page-header-small">
        <div className="page-header-image" data-parallax="true" style={{
          "backgroundImage": "url('../clubphoto.jpg')",
          "transform: ": "translate3d(0px, 0px, 0px)"
        }} ></div>
        <div className="content-center">
          <div className="container">
            <h2 className="title">BHCC Computer Science Exchange</h2>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto text-center">
              <h2 className="title">What is CSX?</h2>
              <h5 className="description">
                The Bunker Hill Community College Computer Science Exchange is an
                organization focused on providing students with opportunities to
                gain practical experience with the field. Members are encouraged to
                participate in our project teams or even start their own. Some of
                our events include coding competitions, guest talks, study breaks
                and workshops.
              </h5>
            </div>
          </div>
          <div className="seperator seperator-primary"></div>
        </div>
        <div className="section text-center">
          <div className="container">
            <h2 className="title">Join the mailing list!</h2>
            <h5 className="description">Keep up with the club!</h5>
            <div className="row">
              <div className="col-lg-5 text-center col-md-5 ml-auto mr-auto">
                <form
                action="https://appspot.us4.list-manage.com/subscribe/post?u=18436d21c9c56d0fd4b060eba&amp;id=cbc9faf7fb"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
                >
                  <div id="form-group">
                    <div className="input-group input-lg">
                    <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_email-85"></i>
                          </span>
                        </div>
                      <input
                        type="email"
                        defaultValue=""
                        name="EMAIL"
                        className="form-control"
                        id="mce-EMAIL"
                        placeholder="Enter email"
                        aria-label="Email"
                        required
                      ></input>
                    </div>

                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_18436d21c9c56d0fd4b060eba_cbc9faf7fb"
                        tabIndex="-1"
                        value=""
                        readOnly
                      ></input>
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        value="Subscribe"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="btn btn-primary btn-block btn-round"
                        style={{ marginTop: "15px" }}
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default Home;
