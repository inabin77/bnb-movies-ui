import { call, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import history from "../../history";

import {
  ADD_MOVIE,
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIE_BY_ID,
  FETCH_MOVIE_BY_ID_SUCCESS,
  UPDATE_MOVIE_BY_ID,
  DELETE_MOVIE
} from "./constants";

function* watcherFetchMoviesSaga() {
  yield takeLatest(FETCH_MOVIES, workerFetchMoviesSaga);
}

function* workerFetchMoviesSaga() {
  try {
    const url = "http://localhost:3001/api/v1/movies";

    const response = yield call(() => {
      return axios.get(url);
    });

    let {
      data: { data }
    } = response;
    yield put({ type: FETCH_MOVIES_SUCCESS, data });
  } catch (error) {
    console.log("​}catch -> error", error);
    // dispatch a failure action to the store with the error
  }
}

function* watcherPostMovieSaga() {
  yield takeLatest(ADD_MOVIE, workerPostMovieSaga);
}

function* workerPostMovieSaga(payload) {
  let { type, data } = payload;
  try {
    const url = "http://localhost:3001/api/v1/movies";

    const response = yield call(() => {
      return axios.post(url, data);
    });

    const resp = response.data;
    history.push('/movies')
    // dispatch a success action to the store with the new dog
  } catch (error) {
    console.log("​}catch -> error", error);
    yield put(
      toast.error("Movie add failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    // dispatch a failure action to the store with the error
    // yield put({ type: LOGIN_ERROR, error });
  }
}

function* watcherUpdateMovieByIDSaga() {
  yield takeLatest(UPDATE_MOVIE_BY_ID, workerUpdateMovieByIDSaga);
}

function* workerUpdateMovieByIDSaga(payload) {
  let { movieID, data, type } = payload;
  try {
    const url = `http://localhost:3001/api/v1/movies/${movieID}`;

    const response = yield call(() => {
      return axios.put(url, data);
    });

    yield put(
      toast.success("Movie updated success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push(`/getMovieDetails/${movieID}`);
    const resp = response.data;
  } catch (error) {
    yield put(
      toast.error("Update Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
  }
}

function* watcherDeleteMovieSaga() {
  yield takeLatest(DELETE_MOVIE, workerDeleteMovieSaga);
}

function* workerDeleteMovieSaga(payload) {
  let { movieID } = payload;
  try {
    const url = `http://localhost:3001/api/v1/movies/${movieID}`;
    const response = yield call(() => {
      return axios.delete(url);
    });

    const resp = response.data;
    yield put(
      toast.success("Movie Deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push("/movies");
    // yield put({ type: DELETE_MOVIE_SUCCESS, data: cinemaID });
  } catch (error) {
    yield put(
      toast.error("Movie delete failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
  }
}

export default function* rootSaga() {
  yield all([
    fork(watcherFetchMoviesSaga),
    fork(watcherPostMovieSaga),
    fork(watcherUpdateMovieByIDSaga),
    fork(watcherDeleteMovieSaga)
  ]);
}
