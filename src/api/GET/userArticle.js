import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const userArticle = async (id) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${HOST}/${id}/`,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
  }

  // const moreUserArticles = async (next) => {
  //   console.log("더보기 클릭", next);
  //   const config = {
  //     method: "GET",
  //     maxBodyLength: Infinity,
  //     url: `${next}`,
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     console.log("모든 게시물 정보", response);
  //     return response;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const prevUserArticles = async (prev) => {
  //   const config = {
  //     method: "GET",
  //     maxBodyLength: Infinity,
  //     url: `${prev}`,
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     console.log("모든 게시물 정보", response);
  //     return response;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
};

export { userArticle };
