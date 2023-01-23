import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getUserCarnivalGifts = async params => {
  const { credential } = await authSessionCheck()

  return get(url.USER_CARNIVAL_GIFTS, {
    params,
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}

export const createUserCarnivalGifts = async carnivalGiftId => {
  const { credential } = await authSessionCheck()

  return post(
    url.USER_CARNIVAL_GIFTS,
    {
      user_carnival_gift: {
        carnival_gift_id: carnivalGiftId
      }
    },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}

export const updateUserCarnivalGifts = async data => {
  const { credential } = await authSessionCheck()

  return put(
    `${url.USER_CARNIVAL_GIFTS}/${data.id}`,
    { user_carnival_gift: data },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}
