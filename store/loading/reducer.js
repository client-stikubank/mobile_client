import { LOADING_SCREEN } from './actionTypes'

const initialState = {
  screen: false
}

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SCREEN:
      return {
        ...state,
        screen: action.payload
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default loading
