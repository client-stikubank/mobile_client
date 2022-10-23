import { GET_STAGE, GET_STAGE_FAIL, GET_STAGE_SUCCESS } from './actionTypes'

export const getStage = (stage, transition) => ({
  type: GET_STAGE,
  payload: { stage, transition }
})

export const getStageSuccess = stage => ({
  type: GET_STAGE_SUCCESS,
  payload: stage
})

export const getStageFail = error => ({
  type: GET_STAGE_FAIL,
  payload: error
})
