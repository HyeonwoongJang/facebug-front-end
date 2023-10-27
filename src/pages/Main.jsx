import React, { useEffect, useState } from "react";

// api
import { getAllArticles, moreArticles } from "../api/GET/articles";
import { deleteArticle } from "../api/DELETE/deleteArticle";
import { getUserInfoInLocalStorage } from "../js/getLocalStorageUser";

// component
import MoodList from "../components/MoodList";

// css
import "../styles/article.css";

const Main = () => {
  const [allArticle, setAllarticle] = useState([]);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  const { userId } = getUserInfoInLocalStorage();

  const nextGetArticles = async () => {
    const response = await moreArticles(next);
    if (response?.data?.results.length > 0) {
      setAllarticle([...response.data.results]);
      setNext(response?.data?.["Next-Page"]);
      setPrev(response?.data?.["Previous-Page"]);
    }
  };

  const prevGetArtices = async () => {
    const response = await moreArticles(prev);
    if (response?.data?.results.length > 0) {
      setAllarticle([...response.data.results]);
      setNext(response?.data?.["Next-Page"]);
      setPrev(response?.data?.["Previous-Page"]);
    }
  };

  useEffect(() => {
    const getFetchArticleAndSetArticles = async () => {
      const response = await getAllArticles();

      if (response?.data?.results.length > 0) {
        setAllarticle([...response.data.results]);
        setNext(response?.data?.["Next-Page"]);
        setPrev(response?.data?.["Previous-Page"]);
      }
    };

    getFetchArticleAndSetArticles();
  }, []);

  return (
    <>
      {allArticle.length === 0 ? (
        <div>작성한 게시글이 없습니다!!</div>
      ) : (
        allArticle.map((article) => {
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
                    deleteArticle(id, allArticle, setAllarticle);
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

export default Main;
