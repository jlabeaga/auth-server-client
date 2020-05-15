import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap'; import { Button, Table } from 'reactstrap';

import AuthService from "../service/AuthService";
import AdminService from "../service/AdminService";
import AuthContext from "../context/AuthContext";
import Result from "../model/Result";
import UserItem from "../component/UserItem";

class UserListPage extends Component {
  static contextType = AuthContext;
  constructor(props) {
    console.log("UserListPage.constructor");
    super(props);
    this.onSelectHandler = this.onSelectHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.reload = this.reload.bind(this);
    this.state = { users: [] };
  }
  async componentDidMount() {
    try {
      const result = await AdminService.findAll(this.context.loginData.jwtToken);
      console.log("result", result);
      if (result.status === Result.StatusSuccess) {
        this.setState({ users: result.data });
      } else {
        alert("Error when trying to retrieve users. " + result.message);
      };
    } catch (error) {
      alert(error);
    }
  }
  async onSelectHandler(e) {
    e.preventDefault();
    try {
      const newUser = await AuthService.register(this.state.username, this.state.password, this.state.email);
      console.log('newUser :>> ', newUser);
      this.props.returnRegisterData(newUser);
      this.props.history.push("/edituser/:id");
    } catch (error) {
      alert("Invalid register: " + error.message);
    }
  }
  async onDeleteHandler(e) {
    e.preventDefault();
    try {
      const newUser = await AuthService.register(this.state.username, this.state.password, this.state.email);
      console.log('newUser :>> ', newUser);
      this.props.returnRegisterData(newUser);
      this.props.history.push("/login");
    } catch (error) {
      alert("Invalid register: " + error.message);
    }
  }
  async handleNewUser(e) {
    e.preventDefault();
    this.props.history.push("/newuser");
  }
  reload() {
    console.log("inside reload");
    this.componentDidMount();
  }
  render() {
    console.log("UserListPage.render");
    const userList = this.state.users.map(user => {
      return <UserItem key={user.id} user={user} reloadParent={this.reload} />;
    });
    return (
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Row className="justify-content-between">
              <h5 className="m-2">Users List</h5>
              <Button color="primary" className="m-2" onClick={this.handleNewUser}>New user</Button>
            </Row>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userList}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
  componentWillUnmount() {
    console.log("UserListPage.unmount");
  }
};

export default withRouter(UserListPage);
