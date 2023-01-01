import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const updateAssessmentAnswer = async (assessmentAnswerId, data) => {
  const { credential } = await authSessionCheck()

  return put(
    url.ASSESSMENT_ANSWERS + `/${assessmentAnswerId}`,
    { assessment_answer: data },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}
