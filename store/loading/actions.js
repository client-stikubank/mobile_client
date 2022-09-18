import { LOADING_SCREEN } from './actionTypes'

export const toggleScreen = status => {
  return {
    type: LOADING_SCREEN,
    payload: status
  }
}
