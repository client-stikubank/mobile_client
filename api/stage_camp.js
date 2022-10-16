import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getStageCamp = async stageCamp => {
  const { credential } = await authSessionCheck()

  return get(url.STAGE_CAMPS + `/${stageCamp.id}`, {
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}
