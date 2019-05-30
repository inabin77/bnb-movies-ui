import {
  FETCH_CINEMAS,
  ADD_CINEMA,
  DELETE_CINEMA,
  UPDATE_CINEMA_BY_ID
} from "./constants";

export function fetchCinemas() {
  return {
    type: FETCH_CINEMAS
  };
}

export function addCinema(data) {
  return {
    type: ADD_CINEMA,
    data
  };
}

export function deleteCinema(cinemaID) {
  return {
    type: DELETE_CINEMA,
    cinemaID
  };
}

export function updateCinemaByID(cinemaID, data) {
  return {
    type: UPDATE_CINEMA_BY_ID,
    cinemaID,
    data
  };
}
