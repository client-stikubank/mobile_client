import React from 'react'
import { ImageBackground } from 'react-native'
import { StyleService, useStyleSheet } from '@ui-kitten/components'

import { Images } from 'assets/images'

const Splash = () => {
  const styles = useStyleSheet(themedStyles)

  return (
    <ImageBackground
      source={Images.afterSplash}
      style={styles.container}
      resizeMode='cover'
    />
  )
}

export default Splash

const themedStyles = StyleService.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  }
})
