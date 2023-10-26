import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

// 유효성 검사
import { EMAIL_REGEX } from "../js/validation";

// api
import { postLogin } from "../api/POST/login";

// js
import { saveLocalStorageToken } from "../js/saveUserInfoLocalStorageToken";
import { getUserInfoInLocalStorage } from "../js/getLocalStorageUser";

//css
import "../styles/form.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitLoginHandler = async ({ email, password }) => {
    const response = await postLogin(email, password);

    if (response.status === 200) {
      const { access, refresh } = response.data;

      saveLocalStorageToken(access, refresh);
      navigate("/");
    } else {
      console.log(response);
      setError("password", { message: "인증되지 않은 계정입니다." });
    }
  };

  useEffect(() => {
    const userInfoData = getUserInfoInLocalStorage();
    if (userInfoData) {
      setIsLogined(true);
    }
  }, []);

  return isLogined ? (
    navigate("/")
  ) : (
    <section className="login-wrap">
      <div className="login-container">
        <h1>로그인</h1>
        <p>
          계정이 없으신가요?{" "}
          <Link className="goRegister" to="/register">
            회원가입
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmitLoginHandler)}>
          <div>
            <div className="inputBox">
              <label htmlFor="email">Email</label>
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
            </div>
            {<div className="login-error">{errors?.email?.message}</div>}

            <div className="inputBox">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "비밀번호를 필수로 입력해주세요.",
                })}
              />
            </div>
            {<div className="login-error">{errors?.password?.message}</div>}

            <input className="submit-btn" type="submit" value="로그인" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
