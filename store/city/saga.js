import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getCities } from 'api/city'
import { GET_CITIES } from './actionTypes'
import { getCitiesSuccess, getCitiesFail, responseError } from 'store/actions'

function* fetchCities({ payload: params }) {
  try {
    const response = yield call(getCities, params)
    yield put(getCitiesSuccess(response?.data))
  } catch (error) {
    yield put(getCitiesFail(error))
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

function* citiesSaga() {
  yield takeEvery(GET_CITIES, fetchCities)
}

export default citiesSaga
