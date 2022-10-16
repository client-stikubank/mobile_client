import { map } from 'lodash'
import { GET_CITIES_FAIL, GET_CITIES_SUCCESS } from './actionTypes'

const INIT_STATE = {
  cities: [],
  error: {}
}

const cities = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: map(action.payload, city => ({
          value: city.id,
          label: city.attributes?.name
        }))
      }

    case GET_CITIES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default cities
