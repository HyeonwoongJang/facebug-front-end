const logout = (navigate) => {
  localStorage.clear();
  navigate("/");
};

const logoutEdit = (navigate) => {
  localStorage.clear();
  navigate("/login");
};

export { logout, logoutEdit };
