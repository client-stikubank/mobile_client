import { fit } from 'helpers/response'
import { map, filter } from 'lodash'
import {
  GET_USER_CARNIVAL_GIFTS_SUCCESS,
  GET_USER_CARNIVAL_GIFTS_FAIL,
  CREATE_USER_CARNIVAL_GIFTS_SUCCESS,
  CREATE_USER_CARNIVAL_GIFTS_FAIL,
  UPDATE_USER_CARNIVAL_GIFTS_SUCCESS,
  UPDATE_USER_CARNIVAL_GIFTS_FAIL
} from './actionTypes'

const INIT_STATE = {
  userCarnivalGifts: [],
  userCarnivalGift: {},
  currentParams: {
    page: 1,
    per_page: 2
  },
  pagination: [],
  error: {}
}

const userCarnivalGifts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_CARNIVAL_GIFTS_SUCCESS:
      return {
        ...state,
        userCarnivalGifts: map(action.payload, userCarnivalGift =>
          fit(userCarnivalGift)
        ),
        pagination: action.pagination,
        currentParams: action.params
      }

    case GET_USER_CARNIVAL_GIFTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case CREATE_USER_CARNIVAL_GIFTS_SUCCESS:
      return {
        ...state,
        userCarnivalGift: action.payload
      }

    case CREATE_USER_CARNIVAL_GIFTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_USER_CARNIVAL_GIFTS_SUCCESS:
      let userCarnivalGifts = []
      if (action.payload.attributes.status === 'cancelled') {
        userCarnivalGifts = filter(state.userCarnivalGifts, {
          id: action.payload.id
        })
      } else {
        userCarnivalGifts = map(state.userCarnivalGifts, userCarnivalGift =>
          userCarnivalGift.id === action.payload.id
            ? fit(action.payload)
            : userCarnivalGift
        )
      }

      return {
        ...state,
        userCarnivalGifts: userCarnivalGifts
      }

    case UPDATE_USER_CARNIVAL_GIFTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default userCarnivalGifts
