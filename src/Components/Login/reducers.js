import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./constants";

const userInitialState = {
  name: null,
  email: null,
  role: null,
  phone: null,
  _id: null
};

export function user(state = userInitialState, action) {
  if (!action) return state;
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.data.user;
    case "PROFILE_UPDATE_SUCCESS":
      return action.data.data
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export function auth(
  state = {
    isAuthenticated: false
  },
  action
) {
  if (!action) return state;
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.data.token,
        isAuthenticated: true
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
