import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AdminService from "../service/AdminService";
import Result from "../model/Result";
import AuthContext from "../context/AuthContext";

export const UserItem = (props) => {
  console.log("UserItem.FC");
  const context = useContext(AuthContext)
  const history = useHistory();
  const { user } = props;

  const handleSelect = (id) => {
    history.push("/edituser/" + id);
  }
  return (
    <tr onClick={() => handleSelect(user.id)}>
      <td>{user.id}</td>
      <td><span>{user.username}</span></td>
      <td>{user.role}</td>
      <td>{user.enabled ? "ENABLED" : "DISABLED"}</td>
    </tr>);
};

export default UserItem;
