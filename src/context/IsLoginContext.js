import { createContext } from "react";
// import { getUserInfoInLocalStorage } from "../js/getLocalStorageUser";

const defaultUserData = {
  isLogin: false,
  userId: "",
  userProfile: "",
  setIsLogin: () => {},
  setLoginUser: () => {},
};

const IsLoginContext = createContext(defaultUserData);

export { IsLoginContext };
