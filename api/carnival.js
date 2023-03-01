import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getCarnival = async () => {
  const { credential } = await authSessionCheck()

  return get(url.ACTIVE_CARNIVAL, {
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}

export const confirmActiveCamp = async id => {
  const { credential } = await authSessionCheck()

  return post(
    url.ACTIVE_CAMP + `/confirm/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}

export const claimActiveCamp = async id => {
  const { credential } = await authSessionCheck()

  return post(
    url.ACTIVE_CAMP + `/claim/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}
