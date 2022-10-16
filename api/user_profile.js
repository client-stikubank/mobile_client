import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getUserProfile = async () => {
  const { credential } = await authSessionCheck()

  return get(url.DISPLAY_PROFILE, {
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}

export const updateUserProfile = async data => {
  const { credential } = await authSessionCheck()

  return put(url.UPDATE_PROFILE, data, {
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}
