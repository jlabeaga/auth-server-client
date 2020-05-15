import Result from "../model/Result";
import config from "../config/config";

const AUTH_SERVER_URL = `${config.BASE_URL}/me`;

const update = async (userData, token) => {
  try {
    console.log("AUTH_SERVER_URL:", AUTH_SERVER_URL);
    const response = await fetch(`${AUTH_SERVER_URL}/`, {
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

const disable = async (token) => {
  try {
    const response = await fetch(`${AUTH_SERVER_URL}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ enabled: false }),
    });
    const result = await response.json();
    console.log("update result = ", result);
    return result;
  } catch (err) {
    return Result.fromError(err);
  }
};

export default {
  update,
  disable
};
