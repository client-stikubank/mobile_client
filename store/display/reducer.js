import { HOME_DISPLAY } from './actionTypes'

const initialState = {
  home: 'carnival'
}

const display = (state = initialState, action) => {
  switch (action.type) {
    case HOME_DISPLAY:
      return {
        ...state,
        home: action.payload
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default display
