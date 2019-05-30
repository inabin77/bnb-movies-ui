import { call, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./constants";
import history from "../../history";

function* watcherSignupSaga() {
  yield takeLatest(SIGNUP, workerSignupSaga);
}

function* workerSignupSaga(payload) {
  let { data, type } = payload;
  try {
    const url = "http://localhost:3001/api/v1/users/signup";

    const response = yield call(() => {
      return axios.post(url, data);
    });

    const resp = response.data;
    yield put({ type: SIGNUP_SUCCESS, data: resp.data });
    yield put(
      toast.success("User account created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    history.push({
      pathname: "/login",
      state: { email: data.email }
    });
  } catch (error) {
    console.log("​}catch -> error", error);
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
    // dispatch a failure action to the store with the error
  }
}

export default function* rootSaga() {
  yield all([fork(watcherSignupSaga)]);
}
