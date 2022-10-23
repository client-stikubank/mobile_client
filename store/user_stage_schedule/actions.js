import {
  GET_USER_STAGE_SCHEDULES,
  GET_USER_STAGE_SCHEDULES_SUCCESS,
  GET_USER_STAGE_SCHEDULES_FAIL,
  CREATE_USER_STAGE_SCHEDULES,
  CREATE_USER_STAGE_SCHEDULES_SUCCESS,
  CREATE_USER_STAGE_SCHEDULES_FAIL
} from './actionTypes'

export const getUserStageSchedules = () => ({
  type: GET_USER_STAGE_SCHEDULES
})

export const getUserStageSchedulesSuccess = schedules => ({
  type: GET_USER_STAGE_SCHEDULES_SUCCESS,
  payload: schedules
})

export const getUserStageSchedulesFail = error => ({
  type: GET_USER_STAGE_SCHEDULES_FAIL,
  payload: error
})

export const createUserStageSchedules = (scheduleId, transition) => ({
  type: CREATE_USER_STAGE_SCHEDULES,
  payload: { scheduleId, transition }
})

export const createUserStageSchedulesSuccess = schedule => ({
  type: CREATE_USER_STAGE_SCHEDULES_SUCCESS,
  payload: schedule
})

export const createUserStageSchedulesFail = error => ({
  type: CREATE_USER_STAGE_SCHEDULES_FAIL,
  payload: error
})
