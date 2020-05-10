import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { Layout } from "./WrappedLayout";
import { withContext } from "../AppContext";

const Signup = (props) => {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    document.body.classList.add("login-page");
    return function cleanup() {
      document.body.classList.remove("login-page");
    };
  });

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: password,
      confirm_password: confirmPassword
    }
    props.signup(newUser)
      .then(() => clearInputs())
      .then(() => props.history.push("/"))
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
                          (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <Input
                          placeholder="First Name"
                          type="text"
                          value={firstName}
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handleFirstNameChange}
                        ></Input>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <Input
                          placeholder="Last Name"
                          type="text"
                          value={lastName}
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handleLastNameChange}
                        ></Input>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (firstFocus ? " input-group-focus" : "")
                        }
                      >
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
                        <Input
                          placeholder="Password"
                          type="password"
                          value={password}
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handlePasswordChange}
                        ></Input>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <Input
                          placeholder="Confirm Password"
                          type="password"
                          value={confirmPassword}
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handleConfirmPasswordChange}
                        ></Input>
                      </InputGroup>
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
                        Sign Up
                      </Button>
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

export default withContext(Signup);
