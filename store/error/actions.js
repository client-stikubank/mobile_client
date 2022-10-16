import { RESPONSE_ERROR } from './actionTypes'

export const responseError = status => {
  return {
    type: RESPONSE_ERROR,
    payload: status
  }
}
