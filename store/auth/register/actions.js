import {
  COLLECT_REGISTER,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './actionTypes'

export const collectRegister = data => {
  return {
    type: COLLECT_REGISTER,
    payload: data
  }
}

export const register = (data, transition) => {
  return {
    type: REGISTER,
    payload: { data, transition }
  }
}

export const registerSuccess = user => {
  return {
    type: REGISTER_SUCCESS,
    payload: user
  }
}

export const registerFail = error => {
  return {
    type: REGISTER_FAIL,
    payload: error
  }
}
