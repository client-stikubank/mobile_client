import AsyncStorage from '@react-native-async-storage/async-storage'
import isAfter from 'date-fns/isAfter'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

export const CREDENTIAL_KEY = 'credential'

export async function authSessionCheck() {
  try {
    const persistString = await AsyncStorage.getItem(CREDENTIAL_KEY)

    if (persistString) {
      const credential = JSON.parse(persistString)
      if (credential) {
        const expiredDate = new Date(credential.expired_at)
        if (isAfter(expiredDate, new Date())) {
          return { logged: true, credential: credential.credential }
        }
      }
    }

    throw new Error('UnAuthenticated')
  } catch (e) {
    return { logged: false }
  }
}

export async function authCreateSession(credential) {
  try {
    const persistSession = {
      credential,
      expired_at: format(addDays(new Date(), 14), 'yyyy-MM-dd')
    }
    await AsyncStorage.setItem(CREDENTIAL_KEY, JSON.stringify(persistSession))
    return { status: 'success', credential: persistSession }
  } catch (e) {
    return { status: 'error', credential: null }
  }
}
