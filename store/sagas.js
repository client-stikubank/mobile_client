import { all, fork } from 'redux-saga/effects'

import LoadingSaga from './loading/saga'
import DisplaySaga from './display/saga'
import ModalSaga from './modal/saga'
import ErrorSaga from './error/saga'
import LoginSaga from './auth/login/saga'
import RegisterSaga from './auth/register/saga'
import UserProfileSaga from './user_profile/saga'
import CarnivalSaga from './carnival/saga'
import StageSaga from './stage/saga'
import StageCampSaga from './stage_camp/saga'
import UserStageScheduleSaga from './user_stage_schedule/saga'
import ProvinceSaga from './province/saga'
import CitySaga from './city/saga'

export default function* rootSaga() {
  yield all([
    fork(LoadingSaga),
    fork(DisplaySaga),
    fork(ModalSaga),
    fork(ErrorSaga),
    fork(LoginSaga),
    fork(RegisterSaga),
    fork(UserProfileSaga),
    fork(CarnivalSaga),
    fork(StageSaga),
    fork(StageCampSaga),
    fork(UserStageScheduleSaga),
    fork(ProvinceSaga),
    fork(CitySaga)
  ])
}
