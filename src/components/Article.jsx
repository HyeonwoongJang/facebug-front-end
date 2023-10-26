import React from "react";

const Article = () => {
  const sampleData = {
    angry: "5%",
    disgust: "3%",
    scared: "10%",
    happy: "60%",
    sad: "1%",
    surprised: "1%",
    neutral: "1%",
  };

  const sampleTitle = "타이틀";

  return (
    <div>
      <div>프로필 이미지</div>
      <div>
        <div>유저 이름</div>
        <div>생성 날짜</div>
      </div>
      <div>게시글 변환 이미지</div>
      <div>
        <div>기분 데이터 목록</div>
        <div>
          <div>화남</div>
          <div>혐오</div>
          <div>무서움</div>
          <div>행복</div>
          <div>슬픔</div>
          <div>놀람</div>
          <div>차분함</div>
        </div>
      </div>
    </div>
  );
};

export default Article;
