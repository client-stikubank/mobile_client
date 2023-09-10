import { all, fork } from "redux-saga/effects";

import LoadingSaga from "./loading/saga";
import DisplaySaga from "./display/saga";
import ModalSaga from "./modal/saga";
import ErrorSaga from "./error/saga";
import LoginSaga from "./auth/login/saga";
import RegisterSaga from "./auth/register/saga";
import ResetPasswordSaga from "./auth/reset_password/saga";
import UserProfileSaga from "./user_profile/saga";
import CarnivalSaga from "./carnival/saga";
import StageSaga from "./stage/saga";
import StageCampSaga from "./stage_camp/saga";
import UserStageScheduleSaga from "./user_stage_schedule/saga";
import ProvinceSaga from "./province/saga";
import CitySaga from "./city/saga";
import RewardSaga from "./reward/saga";
import EventSaga from "./event/saga";
import UserEventSaga from "./user_event/saga";
import CarnivalGiftSaga from "./carnival_gift/saga";
import UserCarnivalGiftSaga from "./user_carnival_gift/saga";
import AssessmentSaga from "./assessment/saga";
import AssessmentAnswerSaga from "./assessment_answer/saga";
import GlobalSettingSaga from "./global_setting/saga";
import QrClueSaga from "./qr_clue/saga";

export default function* rootSaga() {
  yield all([
    fork(LoadingSaga),
    fork(DisplaySaga),
    fork(ModalSaga),
    fork(ErrorSaga),
    fork(LoginSaga),
    fork(RegisterSaga),
    fork(ResetPasswordSaga),
    fork(UserProfileSaga),
    fork(CarnivalSaga),
    fork(StageSaga),
    fork(StageCampSaga),
    fork(UserStageScheduleSaga),
    fork(ProvinceSaga),
    fork(CitySaga),
    fork(RewardSaga),
    fork(EventSaga),
    fork(UserEventSaga),
    fork(CarnivalGiftSaga),
    fork(UserCarnivalGiftSaga),
    fork(AssessmentSaga),
    fork(AssessmentAnswerSaga),
    fork(GlobalSettingSaga),
    fork(QrClueSaga),
  ]);
}
