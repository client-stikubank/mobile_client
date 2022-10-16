import {
  GET_CARNIVAL,
  GET_CARNIVAL_FAIL,
  GET_CARNIVAL_SUCCESS
} from './actionTypes'

export const getCarnival = carnival => ({
  type: GET_CARNIVAL,
  payload: carnival
})

export const getCarnivalSuccess = carnival => ({
  type: GET_CARNIVAL_SUCCESS,
  payload: carnival
})

export const getCarnivalFail = error => ({
  type: GET_CARNIVAL_FAIL,
  payload: error
})
