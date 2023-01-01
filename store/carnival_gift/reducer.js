import { map } from 'lodash'
import { fit } from 'helpers/response'
import {
  GET_CARNIVAL_GIFTS_FAIL,
  GET_CARNIVAL_GIFTS_SUCCESS
} from './actionTypes'

const INIT_STATE = {
  carnivalGifts: [],
  error: {}
}

const carnivalGifts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARNIVAL_GIFTS_SUCCESS:
      return {
        ...state,
        carnivalGifts: map(action.payload, carnivalGift => fit(carnivalGift))
      }

    case GET_CARNIVAL_GIFTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default carnivalGifts
