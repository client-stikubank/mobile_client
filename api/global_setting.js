import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getGlobalSetting = async code => {
  const { credential } = await authSessionCheck()

  return get(url.GLOBAL_SETTINGS + `/${code}`, {
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}
