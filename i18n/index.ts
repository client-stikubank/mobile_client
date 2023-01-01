import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/ms'

import activities from 'i18n/language/en/activities.json'
import auth from 'i18n/language/en/auth.json'
import intro from 'i18n/language/en/intro.json'
import success from 'i18n/language/en/success.json'
import home from 'i18n/language/en/home.json'
import filter from 'i18n/language/en/filter.json'
import common from 'i18n/language/en/common.json'
import notification from 'i18n/language/en/notification.json'
import invite_and_win from 'i18n/language/en/invite_and_win.json'
import reward from 'i18n/language/en/reward.json'
import request from 'i18n/language/en/request.json'
import find from 'i18n/language/en/find.json'
import creat_job from 'i18n/language/en/create_job.json'
import payment from 'i18n/language/en/payment.json'
import more from 'i18n/language/en/more.json'

export const defaultNS = 'common'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      activities: typeof activities
      intro: typeof intro
      common: typeof common
      auth: typeof auth
      success: typeof success
      home: typeof home
      filter: typeof filter
      notification: typeof notification
      invite_and_win: typeof invite_and_win
      reward: typeof reward
      request: typeof request
      creat_job: typeof creat_job
      find: typeof find
      payment: typeof payment
      more: typeof more
    }
  }
}

export const resources = {
  en: {
    activities,
    intro,
    common,
    auth,
    success,
    home,
    filter,
    notification,
    invite_and_win,
    reward,
    find,
    creat_job,
    request,
    payment,
    more
  }
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  compatibilityJSON: 'v3',
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: true
  }
})

i18n.on('languageChanged', lng => {
  dayjs.locale(lng)
})
