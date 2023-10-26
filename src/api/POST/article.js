import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const sendArticle = async (articleId, title) => {
  const articleData = {
    title,
    content: articleId,
    post_img: articleId,
  };

  const accessToken = localStorage.getItem("access");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: `${HOST}/post/`,
    data: articleData,
  };

  try {
    const response = await axios.request(config);
  } catch (err) {
    console.error(err);
  }
};

export { sendArticle };
