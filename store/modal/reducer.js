import { TOGGLE_MODAL } from './actionTypes'

const initialState = {
  modal: false
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload
      }
    default:
      state = { ...state }
      break
  }
  return state
}

export default modal
