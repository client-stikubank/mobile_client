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
