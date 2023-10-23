import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// 유효성 검사
import { EMAIL_REGEX } from "../js/validation";

// api
import { postLogin } from "../api/POST/login";

// js
import { saveLocalStorageToken } from "../js/saveLocalStorageToken";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitLoginHandler = async ({ email, password }) => {
    console.log("로그인 요청 ㄱ");
    const response = await postLogin(email, password);

    if (response.status === 200) {
      const { access, refresh } = response.data;
      saveLocalStorageToken(access, refresh);
      navigate("/");
    } else {
      console.log(response);
      setError("password", { message: "계정을 다시 확인하세요." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLoginHandler)}>
      <input
        {...register("email", {
          required: "이메일을 필수로 입력해주세요.",
          pattern: {
            value: EMAIL_REGEX,
            message: "이메일 형식을 맞춰서 작성하세요.",
            shouldFocus: true,
          },
        })}
      />
      {<div>{errors?.email?.message}</div>}
      <input
        type="password"
        {...register("password", {
          required: "비밀번호를 필수로 입력해주세요.",
        })}
      />
      {<div>{errors?.password?.message}</div>}
      <input type="submit" />
    </form>
  );
};

export default Login;
