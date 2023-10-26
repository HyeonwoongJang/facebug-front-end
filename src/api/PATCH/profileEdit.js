import axios from "axios";
import { HOST } from "../../shared/localhostUrl";
import { getUserInfoInLocalStorage } from "../../js/getLocalStorageUser";

const editProfile = async (profile, nickname, intro) => {
  const profileData = new FormData();

  profileData.append("nickname", nickname);
  profileData.append("profile_img", profile);
  profileData.append("intro", intro);

  const accessToken = localStorage.getItem("access");

  const { userId } = getUserInfoInLocalStorage();

  const config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: `${HOST}/user/info/${userId}/`,
    data: profileData,
  };

  try {
    const response = await axios.request(config);
    const data = localStorage.getItem("payload");
    console.log("프로필 변경 완료", response);
    console.log("??: ", JSON.parse(data));
    return response;
  } catch (err) {
    console.log("에러");
    console.error(err);
  }
};

export { editProfile };
