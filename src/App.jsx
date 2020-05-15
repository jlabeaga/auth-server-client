import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import './App.css';

import AuthContext from "./context/AuthContext";
import UserListPage from "./page/UserListPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import EditMePage from "./page/EditMePage";
import NewUserPage from "./page/NewUserPage";
import EditUserPage from "./page/EditUserPage";
import AuthService from "./service/AuthService";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Result from "./model/Result";
import { Logout } from "./component/Logout";

class App extends Component {
  constructor(props) {
    console.log("App.constructor");
    super(props);
    this.state = { toggle: true };
    this.loginData = undefined;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  async login(username, password) {
    console.log("reached login in App");
    const result = await AuthService.login(username, password);
    console.log("login result in App", result);
    if (result.status === Result.StatusSuccess) {
      this.loginData = result.data;
      this.triggerState();
    } else {
      alert(result.message);
    }
  }
  async logout() {
    console.log("reached logout in App");
    if (this.loginData) {
      console.log("revoking token: " + this.loginData.jwtToken);
      const result = await AuthService.logout(this.loginData.jwtToken);
      console.log("logout result", result);
      if (result.status === Result.StatusSuccess) {
        this.loginData = undefined;
        this.triggerState();
      } else {
        alert(result.message);
      }
    }
  }
  triggerState() {
    // only to force re-rendering
    console.log("App.triggerState");
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  }
  render() {
    console.log('App render: state >> ', this.state);
    console.log('App render: context >> ', this.context);
    const loginData = this.loginData;
    const role = loginData && loginData.user && loginData.user.role;
    const userId = loginData && loginData.user && loginData.user.id;
    const token = loginData && loginData.user && loginData.jwtToken;

    let routes;

    if (!loginData) {
      routes = (
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      );
    } else if (loginData && role === "USER") {
      routes = (
        <Switch>
          <Route path="/editme" exact>
            <EditMePage />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
          <Redirect to="/editme" />
        </Switch>
      );
    } else if (loginData && role === "ADMIN") {
      routes = (
        <Switch>
          <Route path="/" exact>
            <UserListPage />
          </Route>
          <Route path="/userlist" exact>
            <UserListPage />
          </Route>
          <Route path="/newuser" exact>
            <NewUserPage />
          </Route>
          <Route path="/edituser/:id" exact>
            <EditUserPage />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      throw Error(`Unrecognized role ${role}`);
    };

    return (
      <AuthContext.Provider
        value={{
          loginData: loginData,
          login: this.login,
          logout: this.logout
        }}>
        <Router>
          <Header />
          <main>{routes}</main>
          <Footer />
        </Router>
      </AuthContext.Provider >
    );
  }
  componentWillUnmount() {
    console.log("App.unmount");
  }
};

export default App;
