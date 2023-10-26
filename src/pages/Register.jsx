import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
// 유효성 검사
import { EMAIL_REGEX, PWD_REGEX } from "../js/validation";

// js
import { isDuplicateEmail } from "../api/POST/duplicateEmailCheck";
import { isDuplicateNickname } from "../api/POST/duplicateNicknameCheck";
// api
import { postRegister } from "../api/POST/register";

const Register = () => {
  const [profilePreview, setProfilePreview] = useState("");

  const upLoadImg = useRef();

  // 중복 검사 통과 확인을 위한 훅
  const [isPassedEmail, setIsPassedEmail] = useState(false);
  const [isPassedNickname, setIsPassedNickname] = useState(false);

  // 이메일 중복 검사 때 유효한 이메일인지 확인하기 위한 훅
  const [isValidEmail, setIsValidEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  // 네비게이션
  const navigate = useNavigate();

  // 제어 컴포넌트로 이메일, 닉네임 값 실시간 확인
  const watchEmail = watch("email");
  const watchNickname = watch("nickname");

  // 제어 컴포넌트로 프로필 이미지 실시간 확인
  const watchProfile = watch("profile");

  useEffect(() => {
    if (watchProfile && watchProfile.length > 0) {
      const file = watchProfile[0];
      setProfilePreview(URL.createObjectURL(file));
    }
  }, [watchProfile, upLoadImg]);

  console.log("watchProfile:", watchProfile);
  console.log("profilePreview:", profilePreview);

  // useEffect로 실시간으로 이메일을 확인해서 유효성 검사를 실시한 뒤
  // 그에 맞는 불리언 값을 상태 값으로 저장
  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(watchEmail);
    setIsValidEmail(isValidEmail);
  }, [watchEmail]);

  // 이메일 중복 검사 api 요청 함수
  const checkConflictEmail = async () => {
    if (!isValidEmail) {
      setError(
        "email",
        { message: "이메일 형식을 맞춰서 작성하세요." },
        { shouldFocus: true }
      );
      return;
    }
    const result = await isDuplicateEmail(watchEmail);

    if (!result) {
      setError(
        "email",
        { message: "이미 존재하는 이메일 입니다." },
        { shouldFocus: true }
      );
      return;
    } else {
      setIsPassedEmail(true);
    }
  };

  // 닉네임 중복 검사 api 요청 함수
  const checkConflictNickname = async () => {
    if (watchNickname === "") {
      setError(
        "nickname",
        { message: "닉네임 입력하세요." },
        { shouldFocus: true }
      );
      return;
    }

    const result = await isDuplicateNickname(watchNickname);

    if (!result) {
      setError(
        "nickname",
        { message: "이미 존재하는 닉네임 입니다." },
        { shouldFocus: true }
      );
      return;
    } else {
      setIsPassedNickname(true);
    }
  };

  // 회원가입 api 요청
  const onSubmitRegisterHandler = ({
    email,
    nickname,
    password,
    passwordConfirm,
    profile,
    intro,
  }) => {
    // 이메일 / 닉네임 중복 검사가 통과되면
    if (isPassedEmail && isPassedNickname) {
      // 패스워드가 서로 일치하는지 확인
      if (password !== passwordConfirm) {
        setError(
          "passwordConfirm",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
        return;
      }
      // 모두 통과하면 회원가입 api 호출
      console.log("API 호출");
      postRegister(
        email,
        nickname,
        password,
        passwordConfirm,
        profile[0],
        intro
      );
      alert(`${email}에 인증 메일을 보냈습니다.
수신함을 확인하세요.`);
      navigate("/login");
    } else {
      // 이메일 / 닉네임 중복 검사를 하지 않으면 아래 코드 실행
      if (!isPassedEmail) {
        setError(
          "email",
          { message: "이메일 중복 검사를 확인하세요." },
          { shouldFocus: true }
        );
        return;
      } else if (!isPassedNickname) {
        setError(
          "nickname",
          { message: "닉네임 중복 검사를 확인하세요." },
          { shouldFocus: true }
        );
        return;
      }
    }
  };

  return (
    <section className="login-wrap">
      <div className="login-container">
        <h1>회원가입</h1>
        <p>
          이미 계정이 있으신가요?{" "}
          <Link className="goRegister" to="/login">
            로그인
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmitRegisterHandler)}>
          <div className="sel-img-wrap">
            <div>
              <img
                src={
                  profilePreview
                    ? profilePreview
                    : "https://velog.velcdn.com/images/duboo/post/208c6eff-89bd-4387-91bf-3dcf059bc62e/image.png"
                }
                alt="user-profile-img"
              />
            </div>
            <input
              {...register("profile")}
              // ref={upLoadImg}
              type="file"
              accept="image"
            />
          </div>
          <div className={`inputBox ${isPassedEmail ? "passed" : ""}`}>
            <label htmlFor="email">Email</label>
            <div className="inputBox_btn">
              <input
                id="email"
                {...register("email", {
                  required: "이메일을 필수로 입력해주세요.",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "이메일 형식을 맞춰서 작성하세요.",
                    shouldFocus: true,
                  },
                })}
              />
              <button
                onClick={(e) => {
                  checkConflictEmail();
                  e.preventDefault();
                }}
              >
                중복 체크
              </button>
            </div>
          </div>
          {<div className="login-error">{errors?.email?.message}</div>}
          <div>
            <div className={`inputBox ${isPassedNickname ? "passed" : ""}`}>
              <label htmlFor="nickname">Nickname</label>
              <div className="inputBox_btn">
                <input
                  id="nickname"
                  type="text"
                  {...register("nickname", {
                    required: "이름을 필수로 입력해주세요.",
                    maxLength: {
                      value: 12,
                      message: "이름은 12 글자 이내로 작성하세요.",
                      shouldFocus: true,
                    },
                  })}
                />
                <button
                  onClick={(e) => {
                    checkConflictNickname();
                    e.preventDefault();
                  }}
                >
                  중복 체크
                </button>
              </div>
            </div>
          </div>
          {<div className="login-error">{errors?.nickname?.message}</div>}
          <div className="inputBox">
            <label htmlFor="password">Password</label>
            <input
              id="passowrd"
              type="password"
              {...register("password", {
                required: "비밀번호를 필수로 입력해주세요.",
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "패스워드는 문자, 숫자, 특수문자 조합 8글자 이상을 사용하세요.",
                  shouldFocus: true,
                },
              })}
            />
          </div>
          {<div className="login-error">{errors?.password?.message}</div>}
          <div className="inputBox">
            <label htmlFor="pwConfirm">Password Confirm</label>
            <input
              id="pwConfirm"
              type="password"
              {...register("passwordConfirm", {
                required: "비밀번호를 체크를 확인하세요.",
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "패스워드는 문자, 숫자 조합 8글자 이상을 사용하세요.",
                  shouldFocus: true,
                },
              })}
            />
          </div>

          {
            <div className="login-error">
              {errors?.passwordConfirm?.message}
            </div>
          }
          <div className="inputBox">
            <label htmlFor="intro">
              Introduce<span>OPTION</span>
            </label>
            <textarea id="intro" type="text" {...register("intro")} />
          </div>
          <input className="submit-btn" type="submit" value="회원가입" />
        </form>
      </div>
    </section>
  );
};

export default Register;
