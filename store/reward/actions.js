import {
  GET_REWARDS,
  GET_REWARDS_FAIL,
  GET_REWARDS_SUCCESS
} from './actionTypes'

export const getRewards = params => ({
  type: GET_REWARDS,
  payload: params
})

export const getRewardsSuccess = rewards => ({
  type: GET_REWARDS_SUCCESS,
  payload: rewards
})

export const getRewardsFail = error => ({
  type: GET_REWARDS_FAIL,
  payload: error
})
