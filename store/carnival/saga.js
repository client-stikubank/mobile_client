import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getCarnival } from 'api/carnival'
import { GET_CARNIVAL } from './actionTypes'
import {
  getCarnivalSuccess,
  getCarnivalFail,
  responseError,
  toggleScreen
} from 'store/actions'

function* fetchCarnival({ payload: carnival }) {
  try {
    const response = yield call(getCarnival)
    yield put(getCarnivalSuccess(response?.data))
    if (response) {
      yield put(toggleScreen(false))
    }
  } catch (error) {
    yield put(getCarnivalFail(error))
    yield put(responseError(error.response))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: value.join(', ')
      })
    )
  }
}

function* carnivalsSaga() {
  yield takeEvery(GET_CARNIVAL, fetchCarnival)
}

export default carnivalsSaga
