import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL
} from './actionTypes'

export const resetPassword = (data, transition) => {
  return {
    type: RESET_PASSWORD,
    payload: { data, transition }
  }
}

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS
  }
}

export const resetPasswordFail = error => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload: error
  }
}

export const updatePassword = (data, transition) => {
  return {
    type: UPDATE_PASSWORD,
    payload: { data, transition }
  }
}

export const updatePasswordSuccess = () => {
  return {
    type: UPDATE_PASSWORD_SUCCESS
  }
}

export const updatePasswordFail = error => {
  return {
    type: UPDATE_PASSWORD_FAIL,
    payload: error
  }
}
