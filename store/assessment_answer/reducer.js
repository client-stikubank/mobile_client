import { fit } from 'helpers/response'
import {
  UPDATE_ASSESSMENT_ANSWER_FAIL,
  UPDATE_ASSESSMENT_ANSWER_SUCCESS
} from './actionTypes'

const INIT_STATE = {
  assessmentAnswer: {},
  error: {},
  lastSubmitAt: undefined
}

const assessmentAnswers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_ASSESSMENT_ANSWER_SUCCESS:
      return {
        ...state,
        assessmentAnswer: fit(action.payload),
        lastSubmitAt: Date.now()
      }

    case UPDATE_ASSESSMENT_ANSWER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default assessmentAnswers
