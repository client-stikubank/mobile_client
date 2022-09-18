import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authFillForm: ['data'],
  authSubmitAttempt: ['onNextStep'],
  authGetProfile: null,
  authUpdateProfile: ['option'],
  authCheckSession: ['onNextStep'],
  authSetCredential: ['credential'],
  authSetProcessing: ['key', 'status'],
  authSetProfile: ['profile'],
  authResetForm: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  processing: {},
  form: {
    email_or_username: __DEV__ ? 'engineer' : '',
    password: __DEV__ ? 'Password123' : ''
  },
  credential: {},
  profile: {},
  isLogged: false
})

/* ------------- Reducers ------------- */

export const fillForm = (state, payload) => state.merge({ form: payload.data })

export const setCredential = (state, payload) =>
  state.merge({ credential: payload.credential })

export const setProcessing = (state, payload) =>
  state.merge({
    processing: { ...state.processing, [payload.key]: payload.status }
  })

export const setProfile = (state, payload) =>
  state.merge({ profile: payload.profile })

export const resetAuthForm = state =>
  state.merge({
    form: {
      email_or_username: __DEV__ ? 'engineer' : '',
      password: __DEV__ ? 'Password123' : ''
    }
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_FILL_FORM]: fillForm,
  [Types.AUTH_SET_CREDENTIAL]: setCredential,
  [Types.AUTH_SET_PROCESSING]: setProcessing,
  [Types.AUTH_SET_PROFILE]: setProfile,
  [Types.AUTH_RESET_FORM]: resetAuthForm
})
