import { map } from 'lodash'
import { fit } from 'helpers/response'
import { GET_REWARDS_FAIL, GET_REWARDS_SUCCESS } from './actionTypes'

const INIT_STATE = {
  rewards: [],
  error: {}
}

const rewards = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REWARDS_SUCCESS:
      return {
        ...state,
        rewards: map(action.payload, reward => fit(reward))
      }

    case GET_REWARDS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default rewards
