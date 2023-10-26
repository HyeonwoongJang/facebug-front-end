import axios from "axios";
import { HOST } from "../../shared/localhostUrl";

const getAllArticles = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${HOST}/`,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const moreArticles = async (next) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${next}`,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const prevArticles = async (prev) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${prev}`,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export { getAllArticles, moreArticles, prevArticles };
