import { call, put, takeEvery } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import _ from 'lodash'

import { getRewards } from 'api/reward'
import { GET_REWARDS } from './actionTypes'
import {
  getRewardsSuccess,
  getRewardsFail,
  responseError,
  toggleRefresh
} from 'store/actions'

function* fetchRewards({ payload: params }) {
  yield put(toggleRefresh(true))
  try {
    const response = yield call(getRewards, params)
    yield put(getRewardsSuccess(response?.data))
  } catch (error) {
    yield put(getRewardsFail(error))
    yield put(responseError(error.response))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: value.join(', ')
      })
    )
  }
  yield put(toggleRefresh(false))
}

function* rewardsSaga() {
  yield takeEvery(GET_REWARDS, fetchRewards)
}

export default rewardsSaga
