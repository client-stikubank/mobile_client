import React, { memo } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { StyleService, useStyleSheet } from '@ui-kitten/components'

import MyCertificate from './components/MyCertificate'
import MyGifts from './components/MyGifts'
import MyProfile from './components/MyProfile'

const Profile = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  return (
    <View style={styles.carnivalContainer}>
      <MyProfile />
      <MyGifts />
      <MyCertificate />
    </View>
  )
})

export default Profile

const themedStyles = StyleService.create({
  carnivalContainer: {
    marginVertical: 16,
    paddingHorizontal: 24
  }
})
