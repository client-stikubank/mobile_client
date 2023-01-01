import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import {
  createAssessments,
  updateAssessments,
  getAssessments
} from 'api/assessment'
import {
  GET_ASSESSMENTS,
  CREATE_ASSESSMENTS,
  UPDATE_ASSESSMENTS
} from './actionTypes'
import {
  getAssessmentsSuccess,
  getAssessmentsFail,
  createAssessmentsSuccess,
  createAssessmentsFail,
  updateAssessmentsSuccess,
  updateAssessmentsFail,
  assignPendingAssessment,
  responseError,
  toggleScreen,
  toggleRefresh
} from 'store/actions'

function* fetchAssessments({ payload: transition }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(getAssessments)
    yield put(getAssessmentsSuccess(response?.data))
    transition()
  } catch (error) {
    yield put(getAssessmentsFail(error))
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

function* newAssessment({ payload: { carnivalId, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(createAssessments, carnivalId)
    yield put(createAssessmentsSuccess(response?.data))
    yield put(assignPendingAssessment(response?.data))
    yield transition()
  } catch (error) {
    yield put(createAssessmentsFail(error))
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

function* onUpdateAssessment({ payload: { assessment, data, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(updateAssessments, assessment.id, data)
    yield put(updateAssessmentsSuccess(response?.data))
    transition()
  } catch (error) {
    yield put(updateAssessmentsFail(error))
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

function* assessmentsSaga() {
  yield takeEvery(GET_ASSESSMENTS, fetchAssessments)
  yield takeEvery(CREATE_ASSESSMENTS, newAssessment)
  yield takeEvery(UPDATE_ASSESSMENTS, onUpdateAssessment)
}

export default assessmentsSaga
