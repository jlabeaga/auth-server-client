import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap'; import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import AuthService from "../service/AuthService";
import Result from "../model/Result";

class RegisterPage extends Component {
  defaultState = {
    username: "user1",
    password: "user1",
    email: "user1@hotmail.com",
  };
  constructor(props) {
    console.log("RegisterPage.constructor");
    super(props);
    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  async handleRegister(e) {
    e.preventDefault();
    try {
      const result = await AuthService.register(this.state.username, this.state.password, this.state.email);
      if (result.status === Result.StatusSuccess) {
        alert("User registered successfully.");
        this.props.history.push("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
  async handleLogin(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }
  render() {
    console.log("RegisterPage.render");
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h5>Register User</h5>
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
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="email" id="email" placeholder="user1"
                  value={this.state.email}
                  onChange={this.handleChange}
                  aria-describedby="email"
                />
              </FormGroup>
              <div className="d-flex justify-content-center">
                <Button color="success" className="m-2" onClick={this.handleRegister}>Register</Button>
                <Button color="primary" className="m-2" onClick={this.handleLogin}>Login</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  componentWillUnmount() {
    console.log("RegisterPage.unmount");
  }
}

export default withRouter(RegisterPage);
