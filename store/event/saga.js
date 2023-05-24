import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getEvents } from 'api/event'
import { GET_EVENTS } from './actionTypes'
import {
  getEventsSuccess,
  getEventsFail,
  responseError,
  toggleRefresh
} from 'store/actions'

function* fetchEvents({ payload: params }) {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getEvents, params)
    yield put(getEventsSuccess(response?.data))
  } catch (error) {
    yield put(getEventsFail(error))
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

function* eventsSaga() {
  yield takeEvery(GET_EVENTS, fetchEvents)
}

export default eventsSaga
