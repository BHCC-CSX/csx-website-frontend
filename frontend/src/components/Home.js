import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <div className="banner-overlay">
            <div className="banner-text-box">
              <h1 className="my-2 banner-text bg-white text-primary">BHCC</h1>
              <h1 className="banner-text bg-white text-primary">
                Computer Science Exchange
              </h1>
            </div>
          </div>
        </div>
        <Jumbotron className="mb-0">
          <p className="lead">
            The Bunker Hill Community College Computer Science Exchange is an
            organization focused on providing students with opportunities to
            gain practical experience with the field. Members are encouraged to
            participate in our project teams or even start their own. Some of
            our events include coding competitions, guest talks, study breaks
            and workshops.
          </p>
          <hr className="my-4"></hr>
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
              <label htmlFor="mce-EMAIL">Join our mailing list.</label>
              <input
                type="email"
                defaultValue=""
                name="EMAIL"
                className="form-control"
                id="mce-EMAIL"
                placeholder="Enter email"
                required
              ></input>

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
                  className="btn btn-primary"
                  style={{ marginTop: "10px" }}
                ></input>
              </div>
            </div>
          </form>
        </Jumbotron>
      </div>
    );
  }
}
