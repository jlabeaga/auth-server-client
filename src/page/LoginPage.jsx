import React from "react";
import { Component } from "react";

import { Container, Row, Col } from 'reactstrap'; import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import AuthContext from "../context/AuthContext";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  static contextType = AuthContext;
  defaultState = {
    username: "user1",
    password: "user1",
  };
  constructor(props) {
    console.log("LoginPage.contructor");
    super(props);
    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  async handleLogin(e) {
    e.preventDefault();
    try {
      await this.context.login(this.state.username, this.state.password);
    } catch (error) {
      alert("Invalid login: " + error.message);
    }
  }
  async handleRegister(e) {
    e.preventDefault();
    this.props.history.push("/register");
  }
  render() {
    console.log("LoginPage.render");
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h5>Login</h5>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="user1"
                  value={this.state.username}
                  onChange={this.handleChange}
                  aria-describedby="username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div className="d-flex justify-content-center">
                <Button color="primary" className="m-2" onClick={this.handleLogin}>Login</Button>
                <Button color="success" className="m-2" onClick={this.handleRegister}>Register</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  componentWillUnmount() {
    console.log("LoginPage.unmount");
  }
}

export default withRouter(LoginPage);
