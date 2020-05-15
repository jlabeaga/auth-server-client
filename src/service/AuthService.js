import config from "../config/config";
import Result from "../model/Result";

const AUTH_SERVER_URL = `${config.BASE_URL}/auth`;

const login = async (
  username,
  password
) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    console.log("AuthService login result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

const logout = async (token) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/logout/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("AuthService logout result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

const register = async (
  username,
  password,
  email
) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });
    const result = await response.json();
    console.log("register result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

export default {
  login,
  logout,
  register,
};
