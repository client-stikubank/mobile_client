import { GET_CARNIVAL_FAIL, GET_CARNIVAL_SUCCESS } from './actionTypes'
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

    default:
      return state
  }
}

export default carnivals
