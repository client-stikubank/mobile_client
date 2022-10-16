import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { postRegister } from 'api/register'
import { authCreateSession } from 'lib/Session'
import { REGISTER } from './actionTypes'
import { registerSuccess, registerFail, toggleScreen } from 'store/actions'

function* register({ payload: { data, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(postRegister, data)
    yield put(registerSuccess(response))
    yield authCreateSession(response)
    yield transition()
  } catch (error) {
    yield put(registerFail(error))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: value.join(', ')
      })
    )
  }
  yield put(toggleScreen(false))
}

function* registerSaga() {
  yield takeEvery(REGISTER, register)
}

export default registerSaga
