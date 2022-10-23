import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import {
  createUserStageSchedules,
  getUserStageSchedules
} from 'api/user_stage_schedule'
import {
  GET_USER_STAGE_SCHEDULES,
  CREATE_USER_STAGE_SCHEDULES
} from './actionTypes'
import {
  getUserStageSchedulesSuccess,
  getUserStageSchedulesFail,
  createUserStageSchedulesSuccess,
  createUserStageSchedulesFail,
  responseError,
  toggleScreen,
  toggleRefresh,
  getCarnival
} from 'store/actions'

import { fit } from 'helpers/response'
import { map } from 'lodash'

function* fetchUserStageSchedules() {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getUserStageSchedules)
    yield put(
      getUserStageSchedulesSuccess(
        map(response?.data, schedule => fit(schedule))
      )
    )
  } catch (error) {
    yield put(getUserStageSchedulesFail(error))
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

function* newUserStageSchedule({ payload: { scheduleId, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(createUserStageSchedules, scheduleId)
    yield put(createUserStageSchedulesSuccess(response?.data))
    yield put(getCarnival())
    yield transition()
  } catch (error) {
    yield put(createUserStageSchedulesFail(error))
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

function* userStageSchedulesSaga() {
  yield takeEvery(GET_USER_STAGE_SCHEDULES, fetchUserStageSchedules)
  yield takeEvery(CREATE_USER_STAGE_SCHEDULES, newUserStageSchedule)
}

export default userStageSchedulesSaga
