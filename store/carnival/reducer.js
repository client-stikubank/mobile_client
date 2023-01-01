import {
  GET_CARNIVAL_FAIL,
  GET_CARNIVAL_SUCCESS,
  ASSIGN_PENDING_ASSESSMENT
} from './actionTypes'
import { fit } from 'helpers/response'

const INIT_STATE = {
  carnival: {},
  error: {}
}

const carnivals = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARNIVAL_SUCCESS:
      return {
        ...state,
        carnival: fit(action.payload)
      }

    case GET_CARNIVAL_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ASSIGN_PENDING_ASSESSMENT:
      return {
        ...state,
        carnival: {
          ...state.carnival,
          current_assessment_index: 1,
          pending_assessment: fit(action.payload)
        }
      }

    default:
      return state
  }
}

export default carnivals
