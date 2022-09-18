import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'

export const postLogin = data => {
  return post(url.POST_LOGIN, {
    ...data,
    grant_type: 'password',
    client_id: process.env.BACKEND_API_CLIENT,
    client_secret: process.env.BACKEND_API_SECRET
  })
}

export const postLogout = auth => {
  post(url.POST_LOGOUT, {
    token: auth.access_token,
    client_id: process.env.BACKEND_API_CLIENT,
    client_secret: process.env.BACKEND_API_SECRET
  })
}
