import { Platform } from 'react-native'
// import * as Application from 'expo-application'
// import * as Device from 'expo-device'
import Toast from 'react-native-toast-message'
import { call, put, select } from 'redux-saga/effects'
// import FCM from '@react-native-firebase/messaging'

import { authCreateSession, authSessionCheck } from 'lib/Session'
import AuthActions from 'store/AuthRedux'

export async function* postAuthAttempt(api, action) {
  const { onNextStep } = action
  const state = yield select()
  const form = {
    ...state.auth.form
    // device_id:
    //   Platform.OS === 'android'
    //     ? Application.androidId
    //     : await Application.getIosIdForVendorAsync()
    // fcm_token: yield FCM().getToken()
  }

  const response = yield call(api.postAuthAttempt, form)

  if (response.ok) {
    const { success, message, ...credential } = response.data
    if (!success) {
      onNextStep('FAILED', message)
    } else {
      yield authCreateSession(credential)
      yield put(AuthActions.authSetCredential(credential))
      onNextStep('SUCCESS')
    }
  } else {
    onNextStep('FAILED', 'Internal Server Error')
  }
}

export function* getAuthProfile(api) {
  const state = yield select()

  yield put(AuthActions.authSetProcessing('isFetchingProfile', true))

  const response = yield call(api.getAuthProfile, state.auth.credential.user.id)

  if (response.ok) {
    if (response.data) {
      yield put(AuthActions.authSetProfile(response.data))
    }
  }
  yield put(AuthActions.authSetProcessing('isFetchingProfile', false))
}

export function* updateAuthProfile(api, action) {
  const state = yield select()
  const { onNextStep, option } = action

  yield put(AuthActions.authSetProcessing('isFetchingUpdateProfile', true))

  const response = yield call(
    api.updateAuthProfile,
    state.auth.credential.user.id,
    option
  )

  if (response.ok) {
    const { success, message, data } = response.data

    yield put(AuthActions.authSetProfile(data))

    Toast.show({
      type: 'success',
      text1: 'Berhasil',
      text2: 'Profil berhasil diperbaharui 👋'
    })

    if (success) {
      if (onNextStep) {
        onNextStep('SUCCESS')
      }
    } else {
      if (onNextStep) {
        onNextStep('FAILED', message)
      }
    }
  } else {
    if (onNextStep) {
      onNextStep('FAILED', 'Internal Server Error')
    }
  }

  yield put(AuthActions.authSetProcessing('isFetchingUpdateProfile', false))
}

export function* checkAuthSession(action) {
  const { onNextStep } = action

  const session = yield authSessionCheck()

  if (session.logged) {
    yield put(AuthActions.authSetCredential(session.credential))
  }

  onNextStep(session.logged)
}
