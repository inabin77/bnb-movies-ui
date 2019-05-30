import { call, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import history from "../../history";

import {
  ADD_CINEMA,
  FETCH_CINEMAS,
  FETCH_CINEMAS_SUCCESS,
  FETCH_CINEMAS_FAILURE,
  ADD_CINEMA_SUCCESS,
  ADD_CINEMA_FAILURE,
  DELETE_CINEMA,
  DELETE_CINEMA_SUCCESS,
  DELETE_CINEMA_FAILURE,
  UPDATE_CINEMA_BY_ID,
  UPDATE_CINEMA_BY_ID_SUCCESS,
  UPDATE_CINEMA_BY_ID_FAILURE
} from "./constants";

function* watcherFetchCinemasSaga() {
  yield takeLatest(FETCH_CINEMAS, workerFetchCinemasSaga);
}

function* workerFetchCinemasSaga() {
  try {
    const url = "http://localhost:3001/api/v1/cinemas";

    const json = yield fetch(url).then(response => response.json());

    yield put({ type: FETCH_CINEMAS_SUCCESS, data: json.data });
  } catch (error) {
    console.log("​}catch -> error", error);
    // dispatch a failure action to the store with the error
  }
}

function* watcherPostCinemaSaga() {
  yield takeLatest(ADD_CINEMA, workerPostCinemaSaga);
}

function* workerPostCinemaSaga(payload) {
  let { type, data } = payload;
  try {
    const url = "http://localhost:3001/api/v1/cinemas";
    const response = yield call(() => {
      return axios.post(url, data);
    });

    const resp = response.data;
    yield put(
      toast.success("Cinema added success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push("/cinemas");
    // yield put({ type: ADD_CINEMA_SUCCESS, data: resp.data });
  } catch (error) {
    console.log(error.response);
    yield put(
      toast.error(
        error.response.data.message || "Please provide all Input fields",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      )
    );
  }
}

function* watcherUpdateCinemaByIDSaga() {
  yield takeLatest(UPDATE_CINEMA_BY_ID, workerUpdateCinemaByIDSaga);
}

function* workerUpdateCinemaByIDSaga({ cinemaID, data }) {
  try {
    const url = `http://localhost:3001/api/v1/cinemas/${cinemaID}`;
    const response = yield call(() => {
      return axios.put(url, data);
    });

    const resp = response.data;
    yield put(
      toast.success("Cinema Remove success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push("/cinemas");
  } catch (error) {
    yield put(
      toast.error(
        error.response.data.message || "Error",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      )
    );
  }
}

function* watcherDeleteCinemaSaga() {
  yield takeLatest(DELETE_CINEMA, workerDeleteCinemaSaga);
}

function* workerDeleteCinemaSaga(payload) {
  let { cinemaID } = payload;
  try {
    const url = `http://localhost:3001/api/v1/cinemas/${cinemaID}`;
    const response = yield call(() => {
      return axios.delete(url);
    });

    const resp = response.data;
    yield put(
      toast.success("Cinema Remove success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push("/cinemas");
    // console.log('hhhhh', history)
    // yield put({ type: DELETE_CINEMA_SUCCESS, data: cinemaID });
  } catch (error) {
    yield put(
      toast.error(
        error.response.data.message || "Error",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      )
    );
  }
}

export default function* rootSaga() {
  yield all([
    fork(watcherFetchCinemasSaga),
    fork(watcherPostCinemaSaga),
    fork(watcherDeleteCinemaSaga),
    fork(watcherUpdateCinemaByIDSaga)
  ]);
}
