import { takeLatest, all } from 'redux-saga/effects'
import API from 'api'

/* ------------- Types ------------- */

import { AuthTypes } from 'store/AuthRedux'

/* ------------- Sagas ------------- */

import {
  postAuthAttempt
  // checkAuthSession,
  // getAuthProfile,
  // updateAuthProfile
} from './AuthSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(AuthTypes.AUTH_SUBMIT_ATTEMPT, postAuthAttempt, api)
    // takeLatest(AuthTypes.AUTH_GET_PROFILE, getAuthProfile, api),
    // takeLatest(AuthTypes.AUTH_UPDATE_PROFILE, updateAuthProfile, api),
    // takeLatest(AuthTypes.AUTH_CHECK_SESSION, checkAuthSession),
  ])
}
