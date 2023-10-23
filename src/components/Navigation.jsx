import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

// logout function
import { logout } from "../js/logout";

const Navigation = () => {
  const navigate = useNavigate();

  const onClickLogoutHandler = () => {
    logout(navigate);
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Sign Up</Link>
          <Link to="/login">Login</Link>
          <button onClick={onClickLogoutHandler}>Logout</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
