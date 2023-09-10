import { call, put, takeEvery } from "redux-saga/effects";
import Toast from "react-native-toast-message";
import _ from "lodash";

import { getQrClue } from "api/qr_clue";
import { GET_QR_CLUE } from "./actionTypes";
import {
  getQrClueSuccess,
  getQrClueFail,
  responseError,
  toggleRefresh,
} from "store/actions";

function* fetchQrClue({ payload: code }) {
  yield put(toggleRefresh(true));
  try {
    const response = yield call(getQrClue, code);
    yield put(getQrClueSuccess(response?.data, code));
  } catch (error) {
    yield put(getQrClueFail(error));
    yield put(responseError(error.response));
    const { data } = error.response;
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: "error",
        text1: "Permintaan Gagal",
        text2: value.join(", "),
      })
    );
  }
  yield put(toggleRefresh(false));
}

function* qrCluesSaga() {
  yield takeEvery(GET_QR_CLUE, fetchQrClue);
}

export default qrCluesSaga;
