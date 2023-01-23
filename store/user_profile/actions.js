import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_NEW_PASSWORD,
  UPDATE_NEW_PASSWORD_SUCCESS,
  UPDATE_NEW_PASSWORD_FAIL
} from './actionTypes'

export const getUserProfile = () => ({
  type: GET_USER_PROFILE
})

export const getUserProfileSuccess = user_profile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: user_profile
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error
})

export const updateUserProfile = user_profile => ({
  type: UPDATE_USER_PROFILE,
  payload: user_profile
})

export const updateUserProfileSuccess = user_profile => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: user_profile
})

export const updateUserProfileFail = error => ({
  type: UPDATE_USER_PROFILE_FAIL,
  payload: error
})

export const updateNewPassword = user_profile => ({
  type: UPDATE_NEW_PASSWORD,
  payload: user_profile
})

export const updateNewPasswordSuccess = user_profile => ({
  type: UPDATE_NEW_PASSWORD_SUCCESS,
  payload: user_profile
})

export const updateNewPasswordFail = error => ({
  type: UPDATE_NEW_PASSWORD_FAIL,
  payload: error
})
