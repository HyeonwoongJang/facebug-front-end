import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const postRegister = async (
  email,
  nickname,
  password,
  passwordConfirm,
  profile,
  intro
) => {
  const userRegister = new FormData();

  userRegister.append("email", email);
  userRegister.append("nickname", nickname);
  userRegister.append("password", password);
  userRegister.append("profile_img", profile);
  userRegister.append("intro", intro);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${HOST}/register/`,
    data: userRegister,
  };

  try {
    const response = await axios.request(config);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export { postRegister };
