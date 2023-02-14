import { GET_GLOBAL_SETTING_FAIL, GET_GLOBAL_SETTING_SUCCESS } from './actionTypes'
import { fit } from 'helpers/response'
import { filter } from 'lodash'

const INIT_STATE = {
  globalSettings: [],
  error: {}
}

const globalSettings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GLOBAL_SETTING_SUCCESS:
      return {
        ...state,
        globalSettings: [...filter(state.globalSettings, (g) => { return g.code !== action.code }), fit(action.payload)]
      }

    case GET_GLOBAL_SETTING_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default globalSettings
