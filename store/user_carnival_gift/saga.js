import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import {
  createUserCarnivalGifts,
  getUserCarnivalGifts
} from 'api/user_carnival_gift'
import {
  GET_USER_CARNIVAL_GIFTS,
  CREATE_USER_CARNIVAL_GIFTS
} from './actionTypes'
import {
  getUserCarnivalGiftsSuccess,
  getUserCarnivalGiftsFail,
  createUserCarnivalGiftsSuccess,
  createUserCarnivalGiftsFail,
  responseError,
  toggleScreen,
  toggleRefresh
} from 'store/actions'

import { fit } from 'helpers/response'
import { map } from 'lodash'

function* fetchUserCarnivalGifts({ payload: params }) {
  try {
    const response = yield call(getUserCarnivalGifts, params)
    yield put(
      getUserCarnivalGiftsSuccess(
        map(response?.data, carnivalGift => fit(carnivalGift)),
        response?.pagination,
        params
      )
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

function* userCarnivalGiftsSaga() {
  yield takeEvery(GET_USER_CARNIVAL_GIFTS, fetchUserCarnivalGifts)
  yield takeEvery(CREATE_USER_CARNIVAL_GIFTS, newUserCarnivalGift)
}

export default userCarnivalGiftsSaga
