import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getRewards = async params => {
  const { credential } = await authSessionCheck()

  return get(url.REWARDS, {
    params: {
      per_page: 999,
      ...params
    },
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}
