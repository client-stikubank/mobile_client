import { fit } from 'helpers/response'
import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS
} from './actionTypes'

const INIT_STATE = {
  userProfile: {},
  error: {},
  lastSubmitAt: undefined
}

const userProfiles = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: fit(action.payload)
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: fit(action.payload),
        lastSubmitAt: Date.now()
      }

    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default userProfiles
