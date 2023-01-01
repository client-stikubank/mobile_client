import {
  GET_CARNIVAL,
  GET_CARNIVAL_SUCCESS,
  GET_CARNIVAL_FAIL,
  ASSIGN_PENDING_ASSESSMENT
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

export const assignPendingAssessment = assessment => ({
  type: ASSIGN_PENDING_ASSESSMENT,
  payload: assessment
})
