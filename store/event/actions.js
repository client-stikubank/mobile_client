import { GET_EVENTS, GET_EVENTS_FAIL, GET_EVENTS_SUCCESS } from './actionTypes'

export const getEvents = params => ({
  type: GET_EVENTS,
  payload: params
})

export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: events
})

export const getEventsFail = error => ({
  type: GET_EVENTS_FAIL,
  payload: error
})
