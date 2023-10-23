import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const isDuplicateNickname = async (nickname) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${HOST}/register/nickname-check/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      nickname,
    }),
  };

  let isPassed = false;

  try {
    const response = await axios.request(config);
    if (response.status === 200) {
      isPassed = true;
      return isPassed;
    }
  } catch (err) {
    if (err.response.status === 409) {
      console.log("닉네임 중복 가입 차단");
      return isPassed;
    }
    console.error(err);
    return isPassed;
  }
};

export { isDuplicateNickname };
