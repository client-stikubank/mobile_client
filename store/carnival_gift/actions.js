import {
  GET_CARNIVAL_GIFTS,
  GET_CARNIVAL_GIFTS_FAIL,
  GET_CARNIVAL_GIFTS_SUCCESS
} from './actionTypes'

export const getCarnivalGifts = params => ({
  type: GET_CARNIVAL_GIFTS,
  payload: params
})

export const getCarnivalGiftsSuccess = carnivalGifts => ({
  type: GET_CARNIVAL_GIFTS_SUCCESS,
  payload: carnivalGifts
})

export const getCarnivalGiftsFail = error => ({
  type: GET_CARNIVAL_GIFTS_FAIL,
  payload: error
})
