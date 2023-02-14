import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import {
  getUserProfile,
  updateUserProfile,
  updateNewPassword
} from 'api/user_profile'
import {
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  UPDATE_NEW_PASSWORD
} from './actionTypes'
import {
  getUserProfileSuccess,
  getUserProfileFail,
  updateUserProfileSuccess,
  updateUserProfileFail,
  updateNewPasswordSuccess,
  updateNewPasswordFail,
  toggleScreen,
  responseError
} from 'store/actions'

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response?.data))
  } catch (error) {
    yield put(getUserProfileFail(error))
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

function* onUpdateUserProfile({ payload: user_profile }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(updateUserProfile, user_profile)
    yield put(updateUserProfileSuccess(response?.data))
    Toast.show({
      type: 'success',
      text1: 'Permintaan Berhasil',
      text2: 'Profil berhasil diperbaharui'
    })
  } catch (error) {
    yield put(updateUserProfileFail(error))
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

function* onUpdateNewPassword({ payload: user_profile }) {
  yield put(toggleScreen(true))
  try {
    const response = yield call(updateNewPassword, user_profile)
    yield put(updateNewPasswordSuccess(response?.data))
    Toast.show({
      type: 'success',
      text1: 'Permintaan Berhasil',
      text2: 'Informasi akun berhasil diperbaharui'
    })
  } catch (error) {
    yield put(updateNewPasswordFail(error))
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

function* userProfilesSaga() {
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(UPDATE_USER_PROFILE, onUpdateUserProfile)
  yield takeEvery(UPDATE_NEW_PASSWORD, onUpdateNewPassword)
}

export default userProfilesSaga
