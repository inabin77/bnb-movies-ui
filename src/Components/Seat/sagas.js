import { call, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import history from "../../history";

import { ADD_USER_TICKET, FETCH_USER_TICKETS, FETCH_USER_TICKETS_SUCCESS } from "./constants";

function* watcherFetchSeatsSaga() {
  yield takeLatest(FETCH_USER_TICKETS, workerFetchSeatsSaga);
}

function* workerFetchSeatsSaga(payload) {
  try {
    let { params: data1 } = payload;
    const url = "http://localhost:3001/api/v1/seats";

    const response = yield call(() => {
      return axios.post(url, {...data1});
    });

    let {
      data: { data }
    } = response;
    yield put({ type: FETCH_USER_TICKETS_SUCCESS, data });
  } catch (error) {
    console.log("​}catch -> error", error);
    // dispatch a failure action to the store with the error
  }
}

function* watcherPostSeatSaga() {
  yield takeLatest(ADD_USER_TICKET, workerPostSeatSaga);
}

function* workerPostSeatSaga(payload) {
  let { type, data } = payload;
  try {
    const url = "http://localhost:3001/api/v1/seats/post";

    const response = yield call(() => {
      return axios.post(url, data);
    });
    const resp = response.data;
    yield put(
      toast.success("Ticket booking success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      );
      history.push("/")
    // dispatch a success action to the store with the new dog
  } catch (error) {
    console.log("​}catch -> error", error);
    // dispatch a failure action to the store with the error
    // yield put({ type: LOGIN_ERROR, error });
    yield put(
      toast.error(error.response.data.message || "Error",
      {
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
  yield all([fork(watcherFetchSeatsSaga), fork(watcherPostSeatSaga)]);
}
