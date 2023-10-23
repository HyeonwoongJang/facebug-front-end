const logout = (navigate) => {
  localStorage.clear();
  navigate("/");
};

export { logout };
