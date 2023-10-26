import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// components
import NaviList from "./NaviList";

// logout function
import { logout } from "../js/logout";

// 로컬스토리지에서 유저 정보 가져오는 함수
import { getUserInfoInLocalStorage } from "../js/getLocalStorageUser";

// js
import {
  loginNavigationList,
  logoutNavigationList,
} from "../js/NavigationList";

// css
import "../styles/navigation.css";

const Navigation = () => {
  const navigate = useNavigate();

  const [isLogined, setIsLogined] = useState(false);

  // 로컬스토리지에 값이 없으면 false를 리턴하기 때문에 저장안됨
  const { userId, profileImg, nickname } = getUserInfoInLocalStorage();

  // 로그아웃 버튼 클릭시 로그아웃 함수 실행 및 네비게이션
  const onClickLogoutHandler = () => {
    logout(navigate);
    setIsLogined(false);
  };

  useEffect(() => {
    if (userId) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [userId]);

  return (
    <>
      <header className="nav-wrap">
        {isLogined ? (
          <>
            <div className="nav-userInfo">
              <img
                alt="프로필 이미지"
                src={
                  `http://localhost:8000/media/${profileImg}`
                    ? `http://localhost:8000/media/${profileImg}`
                    : "https://velog.velcdn.com/images/duboo/post/208c6eff-89bd-4387-91bf-3dcf059bc62e/image.png"
                }
              />
              <div>{nickname}</div>
            </div>
          </>
        ) : (
          ""
        )}
        <hr />
        <nav className="nav-container">
          <ul>
            {isLogined ? (
              <>
                {loginNavigationList.map((item) => {
                  if (item.page === "로그아웃") {
                    return (
                      <NaviList
                        key={item.id}
                        to={item.to}
                        page={item.page}
                        onClickLogoutHandler={onClickLogoutHandler}
                      />
                    );
                  } else {
                    return (
                      <NaviList
                        key={item.id}
                        userId={userId}
                        to={item.to}
                        page={item.page}
                      />
                    );
                  }
                })}
              </>
            ) : (
              logoutNavigationList.map((item) => {
                return <NaviList key={item.id} to={item.to} page={item.page} />;
              })
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
