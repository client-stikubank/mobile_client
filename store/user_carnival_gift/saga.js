import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import {
  getUserCarnivalGifts,
  createUserCarnivalGifts,
  updateUserCarnivalGifts
} from 'api/user_carnival_gift'
import {
  GET_USER_CARNIVAL_GIFTS,
  CREATE_USER_CARNIVAL_GIFTS,
  UPDATE_USER_CARNIVAL_GIFTS
} from './actionTypes'
import {
  getUserCarnivalGiftsSuccess,
  getUserCarnivalGiftsFail,
  createUserCarnivalGiftsSuccess,
  createUserCarnivalGiftsFail,
  updateUserCarnivalGiftsSuccess,
  updateUserCarnivalGiftsFail,
  responseError,
  toggleScreen,
  getUserCarnivalGifts as refreshUserCarnivalGifts,
  getUserProfile,
  getCarnivalGifts
} from 'store/actions'

function* fetchUserCarnivalGifts({ payload: params }) {
  try {
    const response = yield call(getUserCarnivalGifts, params)
    yield put(
      getUserCarnivalGiftsSuccess(response?.data, response?.pagination, params)
    )
  } catch (error) {
    yield put(getUserCarnivalGiftsFail(error))
    yield put(responseError(error.response))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: value.join(', ')
      })
    )
  }
}

function* newUserCarnivalGift({ payload: { carnivalGiftId, transition } }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(createUserCarnivalGifts, carnivalGiftId)
    yield put(createUserCarnivalGiftsSuccess(response?.data))
    yield put(getUserProfile())
    yield put(getCarnivalGifts())
    yield transition()
    Toast.show({
      type: 'success',
      text1: 'Hore!',
      text2: 'Redeem Kado berhasil.'
    })
  } catch (error) {
    yield put(createUserCarnivalGiftsFail(error))
    yield put(responseError(error.response))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: value.join(', ')
      })
    )
  }
  yield put(toggleScreen(false))
}

function* updateUserCarnivalGift({
  payload: { userCarnivalGift, transition }
}) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(updateUserCarnivalGifts, userCarnivalGift)
    yield put(updateUserCarnivalGiftsSuccess(response?.data))
    yield put(refreshUserCarnivalGifts())

    switch (userCarnivalGift.status) {
      case 'paid':
        Toast.show({
          type: 'success',
          text1: 'Kado berhasil didapatkan 🎉'
        })
        break
      case 'cancelled':
      default:
        yield put(getUserProfile())
        Toast.show({
          type: 'success',
          text1: 'Kado berhasil dibatalkan!'
        })
    }
    yield transition()
  } catch (error) {
    yield put(updateUserCarnivalGiftsFail(error))
    yield put(responseError(error.response))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: value.join(', ')
      })
    )
  }
  yield put(toggleScreen(false))
}

function* userCarnivalGiftsSaga() {
  yield takeEvery(GET_USER_CARNIVAL_GIFTS, fetchUserCarnivalGifts)
  yield takeEvery(CREATE_USER_CARNIVAL_GIFTS, newUserCarnivalGift)
  yield takeEvery(UPDATE_USER_CARNIVAL_GIFTS, updateUserCarnivalGift)
}

export default userCarnivalGiftsSaga
