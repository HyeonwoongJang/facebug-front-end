import React from "react";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">사진 변환 중</div>
    </div>
  );
};

export default Loading;
