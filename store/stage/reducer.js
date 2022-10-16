import { GET_STAGE_FAIL, GET_STAGE_SUCCESS } from './actionTypes'
import { fit } from 'helpers/response'

const INIT_STATE = {
  stage: {},
  error: {}
}

const stages = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STAGE_SUCCESS:
      return {
        ...state,
        stage: fit(action.payload)
      }

    case GET_STAGE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default stages
