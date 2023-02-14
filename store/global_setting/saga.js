import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getGlobalSetting } from 'api/global_setting'
import { GET_GLOBAL_SETTING } from './actionTypes'
import {
  getGlobalSettingSuccess,
  getGlobalSettingFail,
  responseError,
  toggleRefresh
} from 'store/actions'

function* fetchGlobalSetting({ payload: code }) {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getGlobalSetting, code)
    yield put(getGlobalSettingSuccess(response?.data, code))
  } catch (error) {
    yield put(getGlobalSettingFail(error))
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

function* globalSettingsSaga() {
  yield takeEvery(GET_GLOBAL_SETTING, fetchGlobalSetting)
}

export default globalSettingsSaga
