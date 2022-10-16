import { GET_CITIES, GET_CITIES_FAIL, GET_CITIES_SUCCESS } from './actionTypes'

export const getCities = params => ({
  type: GET_CITIES,
  payload: params
})

export const getCitiesSuccess = cities => ({
  type: GET_CITIES_SUCCESS,
  payload: cities
})

export const getCitiesFail = error => ({
  type: GET_CITIES_FAIL,
  payload: error
})
