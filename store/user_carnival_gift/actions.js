import {
  GET_USER_CARNIVAL_GIFTS,
  GET_USER_CARNIVAL_GIFTS_SUCCESS,
  GET_USER_CARNIVAL_GIFTS_FAIL,
  CREATE_USER_CARNIVAL_GIFTS,
  CREATE_USER_CARNIVAL_GIFTS_SUCCESS,
  CREATE_USER_CARNIVAL_GIFTS_FAIL,
  UPDATE_USER_CARNIVAL_GIFTS,
  UPDATE_USER_CARNIVAL_GIFTS_SUCCESS,
  UPDATE_USER_CARNIVAL_GIFTS_FAIL
} from './actionTypes'

export const getUserCarnivalGifts = params => ({
  type: GET_USER_CARNIVAL_GIFTS,
  payload: params
})

export const getUserCarnivalGiftsSuccess = (
  userCarnivalGifts,
  pagination,
  params
) => ({
  type: GET_USER_CARNIVAL_GIFTS_SUCCESS,
  payload: userCarnivalGifts,
  pagination,
  params
})

export const getUserCarnivalGiftsFail = error => ({
  type: GET_USER_CARNIVAL_GIFTS_FAIL,
  payload: error
})

export const createUserCarnivalGifts = (carnivalGiftId, transition) => ({
  type: CREATE_USER_CARNIVAL_GIFTS,
  payload: { carnivalGiftId, transition }
})

export const createUserCarnivalGiftsSuccess = userCarnivalGift => ({
  type: CREATE_USER_CARNIVAL_GIFTS_SUCCESS,
  payload: userCarnivalGift
})

export const createUserCarnivalGiftsFail = error => ({
  type: CREATE_USER_CARNIVAL_GIFTS_FAIL,
  payload: error
})

export const updateUserCarnivalGifts = (userCarnivalGift, transition) => ({
  type: UPDATE_USER_CARNIVAL_GIFTS,
  payload: { userCarnivalGift, transition }
})

export const updateUserCarnivalGiftsSuccess = userCarnivalGift => ({
  type: UPDATE_USER_CARNIVAL_GIFTS_SUCCESS,
  payload: userCarnivalGift
})

export const updateUserCarnivalGiftsFail = error => ({
  type: UPDATE_USER_CARNIVAL_GIFTS_FAIL,
  payload: error
})
