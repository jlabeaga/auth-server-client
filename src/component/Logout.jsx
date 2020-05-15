import React from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const Logout = async (props) => {
  console.log("Logout.FC");
  const context = useContext(AuthContext);
  const history = useHistory();
  await context.logout();
  return null;
}

export default Logout;
