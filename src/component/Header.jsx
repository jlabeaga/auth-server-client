import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import AuthContext from "../context/AuthContext";

export const Header = () => {
  console.log("Header.FC");

  const context = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await context.logout(context.loginData.jwtToken);
    } catch (error) {
      console.log(error);
      console.log("context", context);
      alert(error);
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const isLoggedIn = (context.loginData !== undefined);

  let navigation;

  if (isLoggedIn) {
    navigation = (
      <NavItem>
        <NavLink href="#" onClick={handleLogout}>Logout</NavLink>
      </NavItem>
    );
  } else {
    navigation = (
      <React.Fragment>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Navbar color="light" light expand="sm">
        <NavbarBrand href="/">Auth Server Admin</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {navigation}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

  // return (
  //   <React.Fragment>
  //     <div>Header</div>
  //     <NavLink to="/register">Register</NavLink>
  //     <NavLink to="/login">Login</NavLink>
  //     <a href="#" onClick={handleLogout}>Logout</a>
  //   </React.Fragment>
  // );

}

export default Header;


