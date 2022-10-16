import { map, upperCase } from 'lodash'
import { GET_PROVINCES_FAIL, GET_PROVINCES_SUCCESS } from './actionTypes'

const INIT_STATE = {
  provinces: [],
  error: {}
}

const provinces = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: map(action.payload, province => ({
          value: province.id,
          label: upperCase(province.attributes?.name)
        }))
      }

    case GET_PROVINCES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default provinces
