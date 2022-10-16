import { HOME_DISPLAY } from './actionTypes'

export const homeDisplay = display => {
  return {
    type: HOME_DISPLAY,
    payload: display
  }
}
