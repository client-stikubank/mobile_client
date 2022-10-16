import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getStage } from 'api/stage'
import { GET_STAGE } from './actionTypes'
import {
  getStageSuccess,
  getStageFail,
  responseError,
  toggleRefresh
} from 'store/actions'

function* fetchStage({ payload: stage }) {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getStage, stage)
    yield put(getStageSuccess(response?.data))
  } catch (error) {
    yield put(getStageFail(error))
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

function* stagesSaga() {
  yield takeEvery(GET_STAGE, fetchStage)
}

export default stagesSaga
