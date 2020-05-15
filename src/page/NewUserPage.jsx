import React from "react";
import { Component } from "react";
import AuthContext from "../context/AuthContext";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap'; import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import Result from "../model/Result";
import AdminService from "../service/AdminService";

class NewUserPage extends Component {
  static contextType = AuthContext;
  constructor(props, context) {
    console.log("NewUserPage.constructor");
    super(props, context);
    console.log("props = ", props);
    console.log("context = ", context);
    this.state = {
      id: undefined,
      username: "",
      password: "",
      email: "",
      role: "USER",
      enabled: true
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleEnabledChange = this.handleEnabledChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleRoleChange(changeEvent) {
    this.setState({
      role: changeEvent.target.value
    });
    console.log("handleRoleChange state:", this.state);
  };
  handleEnabledChange(changeEvent) {
    this.setState({
      enabled: (changeEvent.target.value === "true")
    });
    console.log("handleEnabledChange state:", this.state);
  };
  async handleCreate(e) {
    e.preventDefault();
    try {
      let updater = this.state;
      console.log("creating user with updater:", updater);
      const result = await AdminService.create(updater, this.context.loginData.jwtToken);
      console.log('createdUser result:>> ', result);
      if (result.status === Result.StatusSuccess) {
        alert("User created.");
        this.props.history.push("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  async handleGoBack(e) {
    e.preventDefault();
    this.props.history.push("/");
  }
  render() {
    console.log("NewUserPage.render");
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h5>User data:</h5>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="user1"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  aria-describedby="username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Role</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="role"
                      value="USER"
                      checked={this.state.role === "USER"}
                      onChange={this.handleRoleChange}
                    />{' '}
                    USER
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="role"
                      value="ADMIN"
                      checked={this.state.role === "ADMIN"}
                      onChange={this.handleRoleChange}
                    />{' '}
                    ADMIN
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Status</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="enabled"
                      value={true}
                      checked={this.state.enabled === true}
                      onChange={this.handleEnabledChange}
                    />{' '}
                    ENABLED
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="enabled"
                      value={false}
                      checked={this.state.enabled === false}
                      onChange={this.handleEnabledChange}
                    />{' '}
                    DISABLED
                  </Label>
                </FormGroup>
              </FormGroup>

              <div className="d-flex justify-content-center">
                <Button color="primary" className="m-2" onClick={this.handleCreate}>Create</Button>
                <Button color="info" className="m-2" onClick={this.handleGoBack}>Back</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  componentWillUnmount() {
    console.log("NewUserPage.unmount");
  }
}

export default withRouter(NewUserPage);
