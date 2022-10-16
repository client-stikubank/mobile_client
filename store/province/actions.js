import {
  GET_PROVINCES,
  GET_PROVINCES_FAIL,
  GET_PROVINCES_SUCCESS
} from './actionTypes'

export const getProvinces = params => ({
  type: GET_PROVINCES,
  payload: params
})

export const getProvincesSuccess = provinces => ({
  type: GET_PROVINCES_SUCCESS,
  payload: provinces
})

export const getProvincesFail = error => ({
  type: GET_PROVINCES_FAIL,
  payload: error
})
