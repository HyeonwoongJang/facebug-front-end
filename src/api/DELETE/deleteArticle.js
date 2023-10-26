import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const deleteArticle = async (id, allArticle, setAllarticle) => {
  const accessToken = localStorage.getItem("access");

  const config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: `${HOST}/post/${id}/`,
  };

  try {
    const response = await axios.request(config);
    const filterArticle = allArticle.filter((el) => {
      return el.id !== id;
    });
    setAllarticle([...filterArticle]);
    console.log("삭제: ", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export { deleteArticle };
