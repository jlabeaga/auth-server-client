import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap'; import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import UserService from "../service/UserService";
import AuthContext from "../context/AuthContext";
import Result from "../model/Result";

class EditMePage extends Component {
  static contextType = AuthContext;
  constructor(props, context) {
    console.log("EditMePage.constructor");
    super(props, context);
    console.log("props = ", props);
    console.log("context = ", context);
    const { username, email, enabled } = context.loginData.user;
    const password = "";
    this.state = { username, password, email, enabled };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  async handleUpdate(e) {
    e.preventDefault();
    try {
      const { username, password, email } = this.state;
      const newData = password ? { username, password, email } : { username, email };
      const result = await UserService.update(newData, this.context.loginData.jwtToken);
      console.log('updatedUser result:>> ', result);
      if (result.status === Result.StatusSuccess) {
        alert("User data updated.");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error);
    }
  }
  async handleDisable(e) {
    e.preventDefault();
    try {
      const result = await UserService.disable(this.context.loginData.jwtToken);
      if (result.status === Result.StatusSuccess) {
        alert("User disabled.");
        await this.context.logout(this.context.loginData.jwtToken);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error);
    }
  }
  async handleLogout(e) {
    e.preventDefault();
    try {
      await this.context.logout(this.context.loginData.jwtToken);
    } catch (error) {
      alert(error);
    }
  }
  render() {
    console.log("EditMePage.render");
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h5>My data:</h5>
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
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <ButtonGroup>
                <Button color="primary" onClick={this.handleUpdate}>Update</Button>
                <Button color="danger" onClick={this.handleDisable}>Disble</Button>
                <Button color="info" onClick={this.handleLogout}>Logout</Button>
              </ButtonGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  componentWillUnmount() {
    console.log("EditMePage.unmount");
  }
}

export default withRouter(EditMePage);
