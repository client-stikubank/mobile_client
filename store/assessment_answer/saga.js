import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { updateAssessmentAnswer } from 'api/assessment_answer'
import { UPDATE_ASSESSMENT_ANSWER } from './actionTypes'
import {
  updateAssessmentAnswerSuccess,
  updateAssessmentAnswerFail,
  toggleScreen
} from 'store/actions'

function* onUpdateAssessmentAnswer({ payload: { assessmentAnswer, answer } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(updateAssessmentAnswer, assessmentAnswer.id, {
      answer: answer
    })
    yield put(updateAssessmentAnswerSuccess(response?.data))
  } catch (error) {
    yield put(updateAssessmentAnswerFail(error))
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

function* assessmentAnswersSaga() {
  yield takeEvery(UPDATE_ASSESSMENT_ANSWER, onUpdateAssessmentAnswer)
}

export default assessmentAnswersSaga
