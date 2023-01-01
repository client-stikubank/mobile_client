import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getAssessments = async params => {
  const { credential } = await authSessionCheck()

  return get(url.ASSESSMENTS, {
    params,
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}

export const createAssessments = async carnivalId => {
  const { credential } = await authSessionCheck()

  return post(
    url.ASSESSMENTS,
    {
      assessment: {
        programmable_id: carnivalId
      }
    },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}

export const updateAssessments = async (assessmentId, data) => {
  const { credential } = await authSessionCheck()

  return put(
    url.ASSESSMENTS + `/${assessmentId}`,
    { assessment: data },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}
