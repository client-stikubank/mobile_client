import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getStageCamp } from 'api/stage_camp'
import { GET_STAGE_CAMP } from './actionTypes'
import {
  getStageCampSuccess,
  getStageCampFail,
  responseError,
  toggleRefresh
} from 'store/actions'

function* fetchStageCamp({ payload: stageCamp }) {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getStageCamp, stageCamp)
    yield put(getStageCampSuccess(response?.data))
  } catch (error) {
    yield put(getStageCampFail(error))
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

function* stageCampsSaga() {
  yield takeEvery(GET_STAGE_CAMP, fetchStageCamp)
}

export default stageCampsSaga
