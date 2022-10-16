import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { createUserStageSchedules } from 'api/user_stage_schedule'
import { CREATE_USER_STAGE_SCHEDULES } from './actionTypes'
import {
  createUserStageSchedulesSuccess,
  createUserStageSchedulesFail,
  responseError,
  toggleScreen,
  getCarnival
} from 'store/actions'

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
  yield takeEvery(CREATE_USER_STAGE_SCHEDULES, newUserStageSchedule)
}

export default userStageSchedulesSaga
