import { SIGNUP } from "./constants";

export function signup(data) {
  return {
    type: SIGNUP,
    data
  };
}
