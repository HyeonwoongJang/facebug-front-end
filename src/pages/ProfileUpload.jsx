import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// component
import Loading from "../components/Loading";

// api
import { sendImgConversion } from "../api/POST/imgConversion";
import { sendArticle } from "../api/POST/article";
import { useNavigate } from "react-router-dom";

// css
import "../styles/upload.css";

const ProfileUpload = () => {
  const [uploadImgPreview, setUploadImgPreview] = useState("");
  const [isSendCompleted, setIsSendCompleted] = useState(false);
  const [responseData, setResponseData] = useState({});

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const { register, handleSubmit, watch } = useForm();

  // 제어 컴포넌트로 프로필 이미지 실시간 확인
  const watchUploadImg = watch("profile");

  useEffect(() => {
    if (watchUploadImg && watchUploadImg.length > 0) {
      const file = watchUploadImg[0];
      setUploadImgPreview(URL.createObjectURL(file));
    }
  }, [watchUploadImg]);

  const onSubmitSendImg = async ({ profile }) => {
    setIsSendCompleted(true);
    const response = await sendImgConversion(profile[0]);
    if (response) {
      if (response.data.message === "사람의 얼굴이 아닙니다. ^^;") {
        alert("사람의 얼굴이 아닙니다. ^^; 변환이 불가능합니다");
        setUploadImgPreview(``);
        setIsSendCompleted(false);
        return;
      }
      setResponseData({ ...response.data });
      setUploadImgPreview(
        `http://localhost:8000/${response.data.converted_result.converted_image}`
      );
      setIsSendCompleted(false);
    }
  };

  useEffect(() => {}, [uploadImgPreview]);

  const postConvertImg = () => {
    const articleId = responseData.converted_result.id;
    setTitle("");
    if (title !== "" && articleId !== "") {
      sendArticle(articleId, title);
      navigate("/");
    }
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitSendImg)}>
        <div className="img-box">
          <img
            src={
              uploadImgPreview
                ? uploadImgPreview
                : "https://velog.velcdn.com/images/duboo/post/dff9501c-f0ed-4a81-baa2-f291c85aef40/image.png"
            }
            alt="user-upLoad-img"
          />
          <div className="loading-box">
            {isSendCompleted ? <Loading className="loading" /> : ""}
          </div>
        </div>
        <div className="input-box">
          <input {...register("profile")} type="file" accept="image" />
          {/* <div>{errors?.profile?.message}</div> */}
          <input
            disabled={watchUploadImg ? false : true}
            className="convert-btn"
            type="submit"
            value="이미지 변환"
          />
        </div>
      </form>
      <div className="input-box_sec">
        <input
          className="input-box_title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시글 제목"
          value={title}
          type="text"
        />
        <button onClick={postConvertImg}>게시글 등록</button>
      </div>
    </>
  );
};

export default ProfileUpload;
