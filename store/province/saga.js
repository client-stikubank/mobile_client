import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getProvinces } from 'api/province'
import { GET_PROVINCES } from './actionTypes'
import {
  getProvincesSuccess,
  getProvincesFail,
  responseError
} from 'store/actions'

function* fetchProvinces({ payload: params }) {
  try {
    const response = yield call(getProvinces, params)
    yield put(getProvincesSuccess(response?.data))
  } catch (error) {
    yield put(getProvincesFail(error))
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

function* provincesSaga() {
  yield takeEvery(GET_PROVINCES, fetchProvinces)
}

export default provincesSaga
