// Update this
export const COMMON_PATH = "localhost:8080/";

export const LOGIN_PATH = (username: string, password: string) =>
  "api/users/login" + "?username=" + username + "&password=" + password;

export const BORN_TODAY_PATH = () => "api/users/born-today";

export const CUSTOM_INPUT = () => "api/dummy/dummy";
