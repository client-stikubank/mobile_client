import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { postResetPassword, putResetPassword } from 'api/reset_password'
import { RESET_PASSWORD, UPDATE_PASSWORD } from './actionTypes'
import {
  resetPasswordSuccess,
  resetPasswordFail,
  updatePasswordSuccess,
  updatePasswordFail,
  toggleScreen
} from 'store/actions'

function* resetPassword({ payload: { data, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(postResetPassword, data)
    yield put(resetPasswordSuccess(response))
    yield transition()
  } catch (error) {
    yield put(resetPasswordFail(error))
    const { data } = error.response
    Toast.show({
      type: 'error',
      text1: data.errors
    })
  }
  yield put(toggleScreen(false))
}

function* updatePassword({ payload: { data, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(putResetPassword, data)
    yield put(updatePasswordSuccess(response))
    yield transition()
  } catch (error) {
    yield put(updatePasswordFail(error))
    const { data } = error.response
    Toast.show({
      type: 'error',
      text1: data.message
    })
  }
  yield put(toggleScreen(false))
}

function* resetPasswordSaga() {
  yield takeEvery(RESET_PASSWORD, resetPassword)
  yield takeEvery(UPDATE_PASSWORD, updatePassword)
}

export default resetPasswordSaga
