import { fit } from 'helpers/response'
import { map, filter } from 'lodash'
import {
  GET_USER_EVENTS_SUCCESS,
  GET_USER_EVENTS_FAIL,
  CREATE_USER_EVENTS_SUCCESS,
  CREATE_USER_EVENTS_FAIL,
  UPDATE_USER_EVENTS_SUCCESS,
  UPDATE_USER_EVENTS_FAIL
} from './actionTypes'

const INIT_STATE = {
  userEvents: [],
  userEvent: {},
  currentParams: {
    page: 1,
    per_page: 2
  },
  pagination: [],
  error: {}
}

const userEvents = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_EVENTS_SUCCESS:
      return {
        ...state,
        userEvents: map(action.payload, userEvent => fit(userEvent)),
        pagination: action.pagination,
        currentParams: action.params
      }

    case GET_USER_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case CREATE_USER_EVENTS_SUCCESS:
      return {
        ...state,
        userEvent: action.payload
      }

    case CREATE_USER_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_USER_EVENTS_SUCCESS:
      return {
        ...state,
        userEvents: map(state.userEvents, userEvent =>
          userEvent.id === action.payload.id ? fit(action.payload) : userEvent
        )
      }

    case UPDATE_USER_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default userEvents
