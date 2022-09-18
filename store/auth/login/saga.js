import Toast from 'react-native-toast-message'
import { call, put, takeEvery } from 'redux-saga/effects'

import { postLogin, postLogout } from 'api/authentication'
import { authCreateSession } from 'lib/Session'
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  toggleScreen
} from 'store/actions'

function* loginUser({ payload: { user, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password
    })
    yield put(loginSuccess(response))
    yield authCreateSession(response)
    yield transition()
  } catch (error) {
    const { data } = error.response
    Toast.show({
      type: 'error',
      text1: 'Permintaan Gagal',
      text2: `${data.error_description} 🙁`
    })
    yield put(apiError(data.error))
  }
  yield put(toggleScreen(false))
}

function* logoutUser({ payload: { auth, transition } }) {
  yield put(toggleScreen(true))
  try {
    yield call(postLogout, auth)
    yield put(logoutUserSuccess())
    yield transition()
  } catch (error) {
    const { data } = error.response
    Toast.show({
      type: 'error',
      text1: 'Permintaan Gagal',
      text2: `${data.error_description} 🙁`
    })
    yield put(apiError(data.error))
  }
  yield put(toggleScreen(false))
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
