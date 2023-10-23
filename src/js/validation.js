// 이메일 검사 정규 표현식
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 영문 숫자 조합 8자리 이상
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

export { EMAIL_REGEX, PWD_REGEX };
