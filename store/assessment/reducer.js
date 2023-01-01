import { fit } from 'helpers/response'
import { map } from 'lodash'
import {
  GET_ASSESSMENTS_SUCCESS,
  GET_ASSESSMENTS_FAIL,
  CREATE_ASSESSMENTS_SUCCESS,
  CREATE_ASSESSMENTS_FAIL,
  UPDATE_ASSESSMENTS_SUCCESS,
  UPDATE_ASSESSMENTS_FAIL
} from './actionTypes'

const INIT_STATE = {
  assessments: [],
  assessment: {},
  error: {},
  lastSubmitAt: undefined
}

const assessments = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        assessments: map(action.payload, assessment => fit(assessment))
      }

    case GET_ASSESSMENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case CREATE_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        assessment: fit(action.payload)
      }

    case CREATE_ASSESSMENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        assessment: fit(action.payload),
        lastSubmitAt: Date.now()
      }

    case UPDATE_ASSESSMENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default assessments
