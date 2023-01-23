import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'

export const postResetPassword = data => {
  return post(url.RESET_PASSWORD, {
    ...data,
    client_id: process.env.BACKEND_API_CLIENT,
    client_secret: process.env.BACKEND_API_SECRET
  })
}

export const putResetPassword = data => {
  return put(url.RESET_PASSWORD, {
    ...data,
    client_id: process.env.BACKEND_API_CLIENT,
    client_secret: process.env.BACKEND_API_SECRET
  })
}
