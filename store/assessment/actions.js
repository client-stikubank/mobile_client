import {
  GET_ASSESSMENTS,
  GET_ASSESSMENTS_SUCCESS,
  GET_ASSESSMENTS_FAIL,
  CREATE_ASSESSMENTS,
  CREATE_ASSESSMENTS_SUCCESS,
  CREATE_ASSESSMENTS_FAIL,
  UPDATE_ASSESSMENTS,
  UPDATE_ASSESSMENTS_SUCCESS,
  UPDATE_ASSESSMENTS_FAIL
} from './actionTypes'

export const getAssessments = transition => ({
  type: GET_ASSESSMENTS,
  payload: transition
})

export const getAssessmentsSuccess = assessments => ({
  type: GET_ASSESSMENTS_SUCCESS,
  payload: assessments
})

export const getAssessmentsFail = error => ({
  type: GET_ASSESSMENTS_FAIL,
  payload: error
})

export const createAssessments = (carnivalId, transition) => ({
  type: CREATE_ASSESSMENTS,
  payload: { carnivalId, transition }
})

export const createAssessmentsSuccess = assessment => ({
  type: CREATE_ASSESSMENTS_SUCCESS,
  payload: assessment
})

export const createAssessmentsFail = error => ({
  type: CREATE_ASSESSMENTS_FAIL,
  payload: error
})

export const updateAssessments = (assessment, data, transition) => ({
  type: UPDATE_ASSESSMENTS,
  payload: { assessment, data, transition }
})

export const updateAssessmentsSuccess = assessment => ({
  type: UPDATE_ASSESSMENTS_SUCCESS,
  payload: assessment
})

export const updateAssessmentsFail = error => ({
  type: UPDATE_ASSESSMENTS_FAIL,
  payload: error
})
