import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'

export const postRegister = data => {
  return post(url.POST_REGISTER, {
    ...data,
    client_id: process.env.BACKEND_API_CLIENT,
    client_secret: process.env.BACKEND_API_SECRET
  })
}
