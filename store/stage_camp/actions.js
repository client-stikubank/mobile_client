import {
  GET_STAGE_CAMP,
  GET_STAGE_CAMP_FAIL,
  GET_STAGE_CAMP_SUCCESS
} from './actionTypes'

export const getStageCamp = stageCamp => ({
  type: GET_STAGE_CAMP,
  payload: stageCamp
})

export const getStageCampSuccess = stageCamp => ({
  type: GET_STAGE_CAMP_SUCCESS,
  payload: stageCamp
})

export const getStageCampFail = error => ({
  type: GET_STAGE_CAMP_FAIL,
  payload: error
})
