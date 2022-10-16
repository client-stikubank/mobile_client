import { RESPONSE_ERROR } from './actionTypes'

const initialState = {
  error: false
}

const error = (state = initialState, action) => {
  switch (action.type) {
    case RESPONSE_ERROR:
      return {
        ...state,
        error: action.payload
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default error
