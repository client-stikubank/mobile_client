import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const createUserStageSchedules = async scheduleId => {
  const { credential } = await authSessionCheck()

  return post(
    url.USER_STAGE_SCHEDULES,
    {
      user_stage_schedule: {
        stage_camp_schedule_id: scheduleId
      }
    },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}
