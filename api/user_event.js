import { del, get, post, put } from 'helpers/api_helper'
import * as url from 'helpers/url_helper'
import { authSessionCheck } from 'lib/Session'

export const getUserEvents = async params => {
  const { credential } = await authSessionCheck()

  return get(url.USER_EVENTS, {
    params,
    headers: {
      Authorization: `Bearer ${credential?.access_token}`
    }
  })
}

export const createUserEvents = async event_id => {
  const { credential } = await authSessionCheck()

  return post(
    url.USER_EVENTS,
    {
      user_event: {
        event_id: event_id
      }
    },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}

export const updateUserEvents = async data => {
  const { credential } = await authSessionCheck()

  return put(
    `${url.USER_EVENTS}/${data.id}`,
    { user_event: data },
    {
      headers: {
        Authorization: `Bearer ${credential?.access_token}`
      }
    }
  )
}
