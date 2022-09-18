import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR
} from './actionTypes'

export const loginUser = (user, transition) => {
  return {
    type: LOGIN_USER,
    payload: { user, transition }
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}

export const logoutUser = (auth, transition) => {
  return {
    type: LOGOUT_USER,
    payload: { auth, transition }
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {}
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error
  }
}
