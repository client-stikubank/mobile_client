import {
  GET_USER_EVENTS,
  GET_USER_EVENTS_SUCCESS,
  GET_USER_EVENTS_FAIL,
  CREATE_USER_EVENTS,
  CREATE_USER_EVENTS_SUCCESS,
  CREATE_USER_EVENTS_FAIL,
  UPDATE_USER_EVENTS,
  UPDATE_USER_EVENTS_SUCCESS,
  UPDATE_USER_EVENTS_FAIL
} from './actionTypes'

export const getUserEvents = params => ({
  type: GET_USER_EVENTS,
  payload: params
})

export const getUserEventsSuccess = (userEvents, pagination, params) => ({
  type: GET_USER_EVENTS_SUCCESS,
  payload: userEvents,
  pagination,
  params
})

export const getUserEventsFail = error => ({
  type: GET_USER_EVENTS_FAIL,
  payload: error
})

export const createUserEvents = (eventId, transition) => ({
  type: CREATE_USER_EVENTS,
  payload: { eventId, transition }
})

export const createUserEventsSuccess = userEvent => ({
  type: CREATE_USER_EVENTS_SUCCESS,
  payload: userEvent
})

export const createUserEventsFail = error => ({
  type: CREATE_USER_EVENTS_FAIL,
  payload: error
})

export const updateUserEvents = (userEvent, transition) => ({
  type: UPDATE_USER_EVENTS,
  payload: { userEvent, transition }
})

export const updateUserEventsSuccess = userEvent => ({
  type: UPDATE_USER_EVENTS_SUCCESS,
  payload: userEvent
})

export const updateUserEventsFail = error => ({
  type: UPDATE_USER_EVENTS_FAIL,
  payload: error
})
