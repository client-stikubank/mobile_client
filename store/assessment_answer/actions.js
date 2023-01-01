import {
  UPDATE_ASSESSMENT_ANSWER,
  UPDATE_ASSESSMENT_ANSWER_SUCCESS,
  UPDATE_ASSESSMENT_ANSWER_FAIL
} from './actionTypes'

export const updateAssessmentAnswer = (assessmentAnswer, answer) => ({
  type: UPDATE_ASSESSMENT_ANSWER,
  payload: { assessmentAnswer, answer }
})

export const updateAssessmentAnswerSuccess = assessmentAnswer => ({
  type: UPDATE_ASSESSMENT_ANSWER_SUCCESS,
  payload: assessmentAnswer
})

export const updateAssessmentAnswerFail = error => ({
  type: UPDATE_ASSESSMENT_ANSWER_FAIL,
  payload: error
})
