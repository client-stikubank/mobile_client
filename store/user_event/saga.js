import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import {
  getUserEvents,
  createUserEvents,
  updateUserEvents
} from 'api/user_event'
import {
  GET_USER_EVENTS,
  CREATE_USER_EVENTS,
  UPDATE_USER_EVENTS
} from './actionTypes'
import {
  getUserEventsSuccess,
  getUserEventsFail,
  createUserEventsSuccess,
  createUserEventsFail,
  updateUserEventsSuccess,
  updateUserEventsFail,
  responseError,
  toggleScreen,
  getUserEvents as refreshUserEvents,
  getUserProfile
} from 'store/actions'

function* fetchUserEvents({ payload: params }) {
  try {
    const response = yield call(getUserEvents, params)
    yield put(
      getUserEventsSuccess(response?.data, response?.pagination, params)
    )
  } catch (error) {
    yield put(getUserEventsFail(error))
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

function* newUserEvent({ payload: { eventId, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(createUserEvents, eventId)
    yield put(createUserEventsSuccess(response?.data))
    yield put(getUserProfile())
    yield transition()
    Toast.show({
      type: 'success',
      text1: 'Hore!',
      text2: 'Pembayaran Tiket berhasil.'
    })
  } catch (error) {
    yield put(createUserEventsFail(error))
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
  yield put(toggleScreen(false))
}

function* updateUserEvent({ payload: { userEvent, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(updateUserEvents, userEvent)
    yield put(updateUserEventsSuccess(response?.data))
    yield put(refreshUserEvents())

    switch (userEvent.status) {
      case 'used':
        Toast.show({
          type: 'success',
          text1: 'Yay! Enjoy the event 🎉'
        })
        break
      case 'cancelled':
      default:
        yield put(getUserProfile())
        Toast.show({
          type: 'success',
          text1: 'Acara/Event batal!'
        })
    }
    yield transition()
  } catch (error) {
    yield put(updateUserEventsFail(error))
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
  yield put(toggleScreen(false))
}

function* userEventsSaga() {
  yield takeEvery(GET_USER_EVENTS, fetchUserEvents)
  yield takeEvery(CREATE_USER_EVENTS, newUserEvent)
  yield takeEvery(UPDATE_USER_EVENTS, updateUserEvent)
}

export default userEventsSaga
