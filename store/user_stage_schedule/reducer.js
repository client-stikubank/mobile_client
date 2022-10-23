import { fit } from 'helpers/response'
import { map } from 'lodash'
import {
  GET_USER_STAGE_SCHEDULES_SUCCESS,
  GET_USER_STAGE_SCHEDULES_FAIL,
  CREATE_USER_STAGE_SCHEDULES_SUCCESS,
  CREATE_USER_STAGE_SCHEDULES_FAIL
} from './actionTypes'

const INIT_STATE = {
  userStageSchedules: [],
  userStageSchedule: {},
  error: {}
}

const userStageSchedules = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_STAGE_SCHEDULES_SUCCESS:
      return {
        ...state,
        userStageSchedules: action.payload
      }

    case GET_USER_STAGE_SCHEDULES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case CREATE_USER_STAGE_SCHEDULES_SUCCESS:
      return {
        ...state,
        userStageSchedule: action.payload
      }

    case CREATE_USER_STAGE_SCHEDULES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default userStageSchedules
