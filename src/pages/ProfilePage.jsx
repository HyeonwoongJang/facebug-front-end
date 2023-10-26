import React, { useEffect, useState } from "react";
import { getUserInfoInLocalStorage } from "../js/getLocalStorageUser";
import { userArticle } from "../api/GET/userArticle";
import { useNavigate } from "react-router-dom";
import { moreArticles, prevArticles } from "../api/GET/articles";
import { deleteArticle } from "../api/DELETE/deleteArticle";
import { getUserInfo } from "../api/GET/userInfo";

import MoodList from "../components/MoodList";

// css
import "../styles/user.css";

const ProfilePage = () => {
  const { userId } = getUserInfoInLocalStorage();
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const getUserArticle = async (userId) => {
    if (userId) {
      const response = await userArticle(userId);
      if (response?.data?.results.length > 0) {
        setArticles([...response?.data?.results]);
        setNext(response?.data?.["Next-Page"]);
      }
    } else {
      navigate("/login");
    }
  };

  const getUserInfoData = async () => {
    const response = await getUserInfo();
    setUserInfo({ ...response.data });
  };

  useEffect(() => {
    getUserArticle(userId);
    getUserInfoData();
  }, []);

  const nextGetArticles = async () => {
    console.log("next: ", next);
    const response = await moreArticles(next);
    console.log("response: ", response.data.results);
    if (response?.data?.results.length > 0) {
      setArticles([...response.data.results]);
      setNext(response?.data?.["Next-Page"]);
      setPrev(response?.data?.["Previous-Page"]);
    }
  };

  const prevGetArtices = async () => {
    console.log("prev: ", prev);
    const response = await prevArticles(prev);
    console.log("response: ", response.data.results);
    if (response?.data?.results.length > 0) {
      setArticles([...response.data.results]);
      setNext(response?.data?.["Next-Page"]);
      setPrev(response?.data?.["Previous-Page"]);
    }
  };

  const { email, intro, nickname } = userInfo;

  return (
    <>
      <div className="intro-box">
        <div>
          <div>{nickname}</div>
          <div>{email}</div>
        </div>
        <div>{intro}</div>
      </div>
      {articles.length === 0 ? (
        <div>작성한 게시글이 없습니다!!</div>
      ) : (
        articles.map((article) => {
          const { content_detail } = article;
          const keys = Object.keys(JSON.parse(content_detail));
          const values = Object.values(JSON.parse(content_detail));

          const {
            author,
            author_nickname,
            created_at,
            id,
            post_image_url,
            title,
          } = article;
          return (
            <div className="article-wrap" key={id}>
              <div className="article-info-container">
                <div className="article-title">{title}</div>
                <div className="name-created">
                  <div className="article-nickname">{author_nickname}</div>
                  <div className="article-created">{created_at}</div>
                </div>
              </div>
              {userId === author ? (
                <button
                  className="remove-btn"
                  onClick={() => {
                    console.log("게시글 아이디: ", id);
                    deleteArticle(id, articles, setArticles);
                  }}
                >
                  X
                </button>
              ) : (
                ""
              )}
              <div className="img-graph_wrap">
                <div>
                  <img
                    alt="변환 이미지"
                    src={`http://localhost:8000/media/${post_image_url}`}
                  />
                </div>
                <MoodList keys={keys} values={values} />
              </div>
            </div>
          );
        })
      )}
      <div className="box-wrap">
        <button
          className={prev ? `nextPrevBtn active` : "nextPrevBtn"}
          disabled={prev ? false : true}
          onClick={prevGetArtices}
        >
          이전
        </button>
        <button
          className={next ? `nextPrevBtn active` : "nextPrevBtn"}
          disabled={next ? false : true}
          onClick={nextGetArticles}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
