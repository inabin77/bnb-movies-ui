import {
  FETCH_PROFILE,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS
} from "./constants";

export function getProfile(userID) {
  return {
    type: FETCH_PROFILE,
    userID
  };
}

export function updateProfile(userID, data) {
  return {
    type: UPDATE_PROFILE,
    userID,
    data
  };
}
