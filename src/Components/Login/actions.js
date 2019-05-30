import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./constants";
import history from "../../history";

export function login(data) {
  return {
    type: LOGIN_REQUEST,
    data
  };
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_ERROR,
    error: true
  };
}

export function logout() {
  localStorage.removeItem("jwtToken");
  history.push("/movies");
  return {
    type: LOGOUT
  };
}
