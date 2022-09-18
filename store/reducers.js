import { combineReducers } from 'redux'

// Loading
import Loading from './loading/reducer'

// Authentication
import Login from './auth/login/reducer'
import Register from './auth/register/reducer'

const rootReducer = combineReducers({
  Loading,
  Login,
  Register
})

export default rootReducer
