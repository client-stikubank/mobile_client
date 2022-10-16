import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'

export const getCities = async params => {
  return get(url.CITIES, {
    params: {
      per_page: 999,
      ...params
    }
  })
}
