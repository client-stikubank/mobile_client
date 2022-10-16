import {
  CREATE_USER_STAGE_SCHEDULES,
  CREATE_USER_STAGE_SCHEDULES_FAIL,
  CREATE_USER_STAGE_SCHEDULES_SUCCESS
} from './actionTypes'

export const createUserStageSchedules = (scheduleId, transition) => ({
  type: CREATE_USER_STAGE_SCHEDULES,
  payload: { scheduleId, transition }
})

export const createUserStageSchedulesSuccess = scheduleId => ({
  type: CREATE_USER_STAGE_SCHEDULES_SUCCESS,
  payload: scheduleId
})

export const createUserStageSchedulesFail = error => ({
  type: CREATE_USER_STAGE_SCHEDULES_FAIL,
  payload: error
})
