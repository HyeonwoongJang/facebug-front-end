const getUserInfoInLocalStorage = () => {
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    const payload = JSON.parse(localStorage.getItem("payload"));

    const userInfo = {
      userId: payload["user_id"],
      profileImg: payload["profile_img"],
      nickname: payload["nickname"],
      intro: payload["intro"],
    };

    return userInfo;
  } else {
    return false;
  }
};

export { getUserInfoInLocalStorage };
