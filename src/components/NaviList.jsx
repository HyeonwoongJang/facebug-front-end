import React from "react";
import { NavLink, Link } from "react-router-dom";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFileArrowUp,
  faPenToSquare,
  faArrowRightFromBracket,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";

const NaviList = ({ id, userId, to, page, onClickLogoutHandler }) => {
  const retureNaviIcon = (page) => {
    if (page === "홈") {
      return faHouse;
    } else if (page === "업로드") {
      return faFileArrowUp;
    } else if (page === "개인 페이지") {
      return faFileArrowUp;
    } else if (page === "프로필 수정") {
      return faPenToSquare;
    } else if (page === "로그아웃") {
      return faArrowRightFromBracket;
    } else if (page === "로그인") {
      return faSquareArrowUpRight;
    } else if (page === "회원가입") {
      return faArrowRightFromBracket;
    }
  };

  const userPage = (to) => {
    if (to === "/profile") {
      return `${to}/${userId}`;
    } else {
      return to;
    }
  };

  return (
    <li key={String(id)} onClick={onClickLogoutHandler}>
      {page === "로그아웃" ? (
        <Link to={to}>
          <FontAwesomeIcon
            className="nav-icon"
            icon={faArrowRightFromBracket}
          />
          {page}
        </Link>
      ) : (
        <NavLink to={userPage(to)}>
          <FontAwesomeIcon className="nav-icon" icon={retureNaviIcon(page)} />
          {page}
        </NavLink>
      )}
    </li>
  );
};

export default NaviList;
