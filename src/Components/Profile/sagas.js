import { call, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {  } from "../Login/constants"
import history from "../../history";

import {
    UPDATE_PROFILE
} from "./constants";

function* watcherUpdateUserByIDSaga() {
  yield takeLatest(UPDATE_PROFILE, workerUpdateUserByIDSaga);
}

function* workerUpdateUserByIDSaga({ userID, data }) {
  try {
    const url = `http://localhost:3001/api/v1/users/${userID}`;
    const response = yield call(() => {
      return axios.put(url, data);
    });

    const resp = response.data;
    yield put(
      toast.success("Updated success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    );
    yield put({type: "PROFILE_UPDATE_SUCCESS", data: resp})
    history.push("/movies");
  } catch (error) {
    yield put(
        toast.error(error.response.data.result, {
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
    fork(watcherUpdateUserByIDSaga)
  ]);
}
