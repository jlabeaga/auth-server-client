import Result from "../model/Result";
import config from "../config/config";

const AUTH_SERVER_URL = `${config.BASE_URL}/admin`;

const findAll = async (token) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("findAll result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

const findOne = async (id, token) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("findOne result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

const create = async (user, token) => {
  try {
    const { id, ...updater } = user;
    const response = await fetch(`${AUTH_SERVER_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updater),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

const update = async (userData, token) => {
  console.log("inside AdminService.update");
  try {
    console.log("AUTH_SERVER_URL:", AUTH_SERVER_URL);
    const response = await fetch(`${AUTH_SERVER_URL}/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    console.log("update result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

const remove = async (id, token) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("remove result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove
};
