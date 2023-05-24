import React, { useState } from 'react'
import { StyleService, useStyleSheet } from '@ui-kitten/components'

import AnimatedLottieView from 'lottie-react-native'
import { Images } from 'assets/images'

const AfterSplash = ({ freeze }: any) => {
  const [show, setShow] = useState(true)
  const styles = useStyleSheet(themedStyles)

  return (
    (show || freeze) && (
      <AnimatedLottieView
        source={Images.afterSplash}
        style={styles.container}
        autoPlay={!freeze}
        loop={false}
        onAnimationFinish={() => setShow(false)}
        resizeMode='cover'
      />
    )
  )
}

export default AfterSplash

const themedStyles = StyleService.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: '#FFC40C'
  },
  animated: {}
})
