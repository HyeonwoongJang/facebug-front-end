import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const sendImgConversion = async (img) => {
  const sendImg = new FormData();

  sendImg.append("original_image", img);
  sendImg.append("converted_image", img);

  const accessToken = localStorage.getItem("access");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // "Content-Type": "multipart/form-data",
    },
    url: `${HOST}/post/image-convert/`,
    data: sendImg,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export { sendImgConversion };
