import {
  CREATE_USER_STAGE_SCHEDULES_FAIL,
  CREATE_USER_STAGE_SCHEDULES_SUCCESS
} from './actionTypes'

const INIT_STATE = {
  userStageSchedule: {},
  error: {}
}

const userStageSchedules = (state = INIT_STATE, action) => {
  switch (action.type) {
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
