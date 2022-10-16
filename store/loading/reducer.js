import { LOADING_REFRESH, LOADING_SCREEN } from './actionTypes'

const initialState = {
  screen: false,
  refresh: false
}

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SCREEN:
      return {
        ...state,
        screen: action.payload
      }
    case LOADING_REFRESH:
      return {
        ...state,
        refresh: action.payload
      }
    default:
      state = { ...state }
      break
  }
  return state
}

export default loading
