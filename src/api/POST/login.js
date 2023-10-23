import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const postLogin = async (email, password) => {
  const loginData = {
    email,
    password,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${HOST}/login/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: loginData,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export { postLogin };
