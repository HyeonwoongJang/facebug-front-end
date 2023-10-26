import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editProfile } from "../api/PATCH/profileEdit";
import { getUserInfo } from "../api/GET/userInfo";
import { logoutEdit } from "../js/logout";
import { useNavigate } from "react-router-dom";
import { getUserInfoInLocalStorage } from "../js/getLocalStorageUser";

// css
import "../styles/edit.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [uploadImgPreview, setUploadImgPreview] = useState("");

  const [isClickEdit, setIsClickEdit] = useState(false);

  const [userData, setUserData] = useState({});

  const { profileImg } = getUserInfoInLocalStorage();

  const getUserInfoData = async () => {
    const response = await getUserInfo();
    setUserData({ ...response.data });
    // const { email, id, intro, nickname } = response.data;
    // console.log(email, id, intro, nickname);
  };

  useEffect(() => {
    getUserInfoData();
  }, []);

  const { nickname, intro } = userData;

  const sendEditProfile = ({ profile, nickname, intro }) => {
    if ((profile !== "" && nickname !== "", intro !== "")) {
      editProfile(profile[0], nickname, intro);
      alert("프로필을 업데이트 합니다 다시 로그인하세요.");
      logoutEdit(navigate);
    } else {
      return;
    }
  };

  // 제어 컴포넌트로 프로필 이미지 실시간 확인
  const watchUploadImg = watch("profile");

  useEffect(() => {
    if (watchUploadImg && watchUploadImg.length > 0) {
      const file = watchUploadImg[0];
      setUploadImgPreview(URL.createObjectURL(file));
    }
  }, [watchUploadImg]);

  const clickEditBtn = () => {
    setIsClickEdit(true);
  };

  const clickCancelBtn = () => {
    setIsClickEdit(false);
  };

  return (
    <div>
      {isClickEdit ? (
        <>
          <form onSubmit={handleSubmit(sendEditProfile)}>
            <div className="user-info_wrap">
              <div className="user-info_imgBox">
                <img
                  src={
                    uploadImgPreview
                      ? uploadImgPreview
                      : `http://localhost:8000/media/${profileImg}`
                  }
                  alt="user-profile-img"
                />
              </div>
              <input {...register("profile")} type="file" accept="image" />
              <div className="input-box_edit">
                <div>닉네임 : </div>
                <input {...register("nickname")} type="text" />
              </div>
              <div className="input-box_edit">
                <div>소개글 : </div>
                <input {...register("intro")} type="text" />
              </div>
              <input
                className="edit-sendBtn"
                type="submit"
                value="프로필 변경하기"
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="user-info_wrap">
            <div className="user-info_imgBox">
              <img
                src={
                  uploadImgPreview
                    ? uploadImgPreview
                    : `http://localhost:8000/media/${profileImg}`
                }
                alt="user-profile-img"
              />
            </div>
            <div className="edit-title">{nickname}</div>
            <div className="edit-intro">{intro}</div>
          </div>
        </>
      )}
      <div className="edit-btn_box">
        <button className="edit-btn" onClick={clickEditBtn}>
          수정
        </button>
        <button className="edit-btn" onClick={clickCancelBtn}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
