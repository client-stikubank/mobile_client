import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'

export const getProvinces = async params => {
  return get(url.PROVINCES, {
    params: {
      per_page: 999,
      ...params
    }
  })
}
