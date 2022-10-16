import { TOGGLE_MODAL } from './actionTypes'

export const toggleModal = status => {
  return {
    type: TOGGLE_MODAL,
    payload: status
  }
}
