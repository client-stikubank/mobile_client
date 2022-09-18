import {
  COLLECT_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './actionTypes'

const initialState = {
  form: {},
  error: ''
}

const register = (state = initialState, action) => {
  switch (action.type) {
    case COLLECT_REGISTER:
      state = {
        ...state,
        form: { ...state.form, ...action.payload }
      }
      break
    case REGISTER_SUCCESS:
      state = { ...state, form: {} }
      break
    case REGISTER_FAIL:
      state = { ...state, error: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default register
