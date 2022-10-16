import { GET_STAGE_CAMP_FAIL, GET_STAGE_CAMP_SUCCESS } from './actionTypes'
import { fit } from 'helpers/response'

const INIT_STATE = {
  stageCamp: {},
  error: {}
}

const stageCamps = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STAGE_CAMP_SUCCESS:
      return {
        ...state,
        stageCamp: fit(action.payload)
      }

    case GET_STAGE_CAMP_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default stageCamps
