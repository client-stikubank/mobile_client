import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getCarnivalGifts = async params => {
  const { credential } = await authSessionCheck()

  return get(url.CARNIVAL_GIFTS, {
    params: {
      per_page: 999,
      ...params
    },
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}
