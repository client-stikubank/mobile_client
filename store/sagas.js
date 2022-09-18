import { all, fork } from 'redux-saga/effects'

import LoadingSaga from './loading/saga'
import LoginSaga from './auth/login/saga'
import RegisterSaga from './auth/register/saga'

export default function* rootSaga() {
  yield all([fork(LoadingSaga), fork(LoginSaga), fork(RegisterSaga)])
}
