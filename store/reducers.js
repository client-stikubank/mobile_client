import { combineReducers } from 'redux'

// Toggle
import Loading from './loading/reducer'
import Display from './display/reducer'
import Modal from './modal/reducer'

// Error
import Error from './error/reducer'

// Authentication
import Login from './auth/login/reducer'
import Register from './auth/register/reducer'
import ResetPassword from './auth/reset_password/reducer'

import UserProfile from './user_profile/reducer'
import Carnival from './carnival/reducer'
import Stage from './stage/reducer'
import StageCamp from './stage_camp/reducer'
import UserStageSchedule from './user_stage_schedule/reducer'
import Province from './province/reducer'
import City from './city/reducer'
import Reward from './reward/reducer'
import Event from './event/reducer'
import UserEvent from './user_event/reducer'
import CarnivalGift from './carnival_gift/reducer'
import UserCarnivalGift from './user_carnival_gift/reducer'
import Assessment from './assessment/reducer'
import AssessmentAnswer from './assessment_answer/reducer'
import GlobalSetting from './global_setting/reducer'

const rootReducer = combineReducers({
  Loading,
  Display,
  Modal,
  Error,
  Login,
  Register,
  ResetPassword,
  UserProfile,
  Carnival,
  Stage,
  StageCamp,
  UserStageSchedule,
  Province,
  City,
  Reward,
  Event,
  UserEvent,
  CarnivalGift,
  UserCarnivalGift,
  Assessment,
  AssessmentAnswer,
  GlobalSetting
})

export default rootReducer
