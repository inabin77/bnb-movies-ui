import { call, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import history from "../../history";
import { loginSuccess, loginFailure } from "./actions";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

function* watcherLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, workerLoginSaga);
}

function* workerLoginSaga(payload) {
  let { type, data } = payload;
  try {
    const url = "http://localhost:3001/api/v1/auth/login";

    const response = yield call(() => {
      return axios.post(url, data);
    });

    const resp = response.data;
    let { token, user } = resp;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("role", user.role);
    yield put(loginSuccess(resp));
    yield put(
      toast.success("User Logged In", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push("/movies");
    // yield put({ type: LOGIN_SUCCESS, data: resp.data });
  } catch (error) {
    yield put(loginFailure(error));
    yield put(
      toast.error(error.response.data.message, {
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
  yield all([fork(watcherLoginSaga)]);
}
