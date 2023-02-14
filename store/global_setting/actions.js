import {
  GET_GLOBAL_SETTING,
  GET_GLOBAL_SETTING_FAIL,
  GET_GLOBAL_SETTING_SUCCESS
} from './actionTypes'

export const getGlobalSetting = code => ({
  type: GET_GLOBAL_SETTING,
  payload: code
})

export const getGlobalSettingSuccess = (globalSetting, code) => ({
  type: GET_GLOBAL_SETTING_SUCCESS,
  payload: globalSetting,
  code: code
})

export const getGlobalSettingFail = error => ({
  type: GET_GLOBAL_SETTING_FAIL,
  payload: error
})
