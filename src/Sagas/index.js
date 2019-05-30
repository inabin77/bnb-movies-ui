import movieSaga from "../Components/Movie/sagas";
import cinemaSaga from "../Components/Cinemas/sagas";
import signupSaga from "../Components/Signup/sagas";
import loginSaga from "../Components/Login/sagas";
import seatSaga from "../Components/Seat/sagas";
import profileSaga from "../Components/Profile/sagas";

let sagas = {
  movieSaga,
  cinemaSaga,
  signupSaga,
  loginSaga,
  seatSaga,
  profileSaga
};

export function initSagas(sagaMiddleware) {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}
