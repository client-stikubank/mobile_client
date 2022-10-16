import { LOADING_SCREEN, LOADING_REFRESH } from './actionTypes'

export const toggleScreen = status => {
  return {
    type: LOADING_SCREEN,
    payload: status
  }
}

export const toggleRefresh = status => {
  return {
    type: LOADING_REFRESH,
    payload: status
  }
}
