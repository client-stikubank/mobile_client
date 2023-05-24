import { map } from 'lodash'
import { fit } from 'helpers/response'
import { GET_EVENTS_FAIL, GET_EVENTS_SUCCESS } from './actionTypes'

const INIT_STATE = {
  events: [],
  error: {}
}

const events = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: map(action.payload, event => fit(event))
      }

    case GET_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default events
