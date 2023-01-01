import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getCarnivalGifts } from 'api/carnival_gift'
import { GET_CARNIVAL_GIFTS } from './actionTypes'
import {
  getCarnivalGiftsSuccess,
  getCarnivalGiftsFail,
  responseError,
  toggleRefresh
} from 'store/actions'

function* fetchCarnivalGifts({ payload: params }) {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getCarnivalGifts, params)
    yield put(getCarnivalGiftsSuccess(response?.data))
  } catch (error) {
    yield put(getCarnivalGiftsFail(error))
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
  yield put(toggleRefresh(false))
}

function* carnivalGiftsSaga() {
  yield takeEvery(GET_CARNIVAL_GIFTS, fetchCarnivalGifts)
}

export default carnivalGiftsSaga
