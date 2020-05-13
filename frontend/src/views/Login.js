import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Layout } from "./WrappedLayout";
import { withContext } from "../AppContext";

const Login = (props) => {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    document.body.classList.add("login-page");
    return function cleanup() {
      document.body.classList.remove("login-page");
    };
  });

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const clearInputs = () => {
    setUsername("")
    setPassword("")
    setErrorMsg("")
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      username: username,
      password: password
    }
    props.login(credentials)
      .then(() => clearInputs())
      .then(() => props.history.push("/profile"))
      .catch(err => {
        var errorString = ""

        if (err.response.data.non_field_errors) {
          err.response.data.non_field_errors.forEach(error => {
            errorString += error + '\n'
          })
        } else if (err.response.data) {
          for (const field in err.response.data) {
            errorString += `${field[0].toUpperCase() + field.slice(1)} Error: ${err.response.data[field]}\n`
          }
        }
        setErrorMsg(errorString)
      })
  }

  return (
    <>
      <Layout transparent={true}>
        {/* <div className="page-header clear-filter" filter-color="orange"> */}
        <div className="page-header clear-filter">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url('../poster.png')",
            }}
          ></div>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" md="4">
                <Card className="card-login card-plain">
                  <Form action="" className="form" method="">
                    <CardHeader className="text-center">
                      <div className="logo-container">
                        <img
                          alt="..."
                                                  src="../logo.png"
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_single-02"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Username"
                          type="text"
                          value={username}
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleUsernameChange}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons objects_key-25"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          value={password}
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handlePasswordChange}
                        ></Input>
                      </InputGroup>
                      {
                        errorMsg &&
                        <h6 style={{ color: "red", whiteSpace: "pre-line" }}>{errorMsg}</h6>
                      }
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        className="btn-round"
                        color="primary"
                        href="#pablo"
                        onClick={handleSubmit}
                        size="lg"
                      >
                        Sign In
                      </Button>
                      <div className="pull-left">
                        <h6>
                          <Link to="/signup" className="link">Create Account</Link>
                        </h6>
                      </div>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withContext(Login);
