// 네비게이션 목록들

// id 3번의 로그인 유저의 경우 parms로 유저 번호를 받아와야함
const loginNavigationList = [
  { id: 1, to: "/", page: "홈" },
  { id: 2, to: "/profile-upload", page: "업로드" },
  { id: 3, to: `/profile`, page: "개인 페이지" },
  { id: 4, to: "/profile-edit", page: "프로필 수정" },
  { id: 5, to: "", page: "로그아웃" },
];

const logoutNavigationList = [
  { id: 1, to: "/", page: "홈" },
  { id: 2, to: "/login", page: "로그인" },
  { id: 3, to: "/register", page: "회원가입" },
];

export { loginNavigationList, logoutNavigationList };
