import axios from "axios";
import { HOST } from "../../shared/localhostUrl";
import { getUserInfoInLocalStorage } from "../../js/getLocalStorageUser";

const getUserInfo = async () => {
  const accessToken = localStorage.getItem("access");

  const { userId } = getUserInfoInLocalStorage();

  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // "Content-Type": "multipart/form-data",
    },
    url: `${HOST}/user/info/${userId}`,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export { getUserInfo };
