import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL
} from './actionTypes'

const initialState = {
  error: ''
}

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      state = { ...state }
      break
    case RESET_PASSWORD_FAIL:
      state = { ...state, error: action.payload }
      break
    case UPDATE_PASSWORD_SUCCESS:
      state = { ...state }
      break
    case UPDATE_PASSWORD_FAIL:
      state = { ...state, error: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default resetPassword
