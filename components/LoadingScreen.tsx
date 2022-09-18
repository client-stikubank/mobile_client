import React, { memo } from 'react'
import { View } from 'react-native'
import { StyleService, useStyleSheet } from '@ui-kitten/components'

import AnimatedLottieView from 'lottie-react-native'
import { Images } from 'assets/images'
interface LoadingScreenProps {
  show: any
}

const LoadingScreen = memo(({ show }: LoadingScreenProps) => {
  const styles = useStyleSheet(themedStyles)

  return show ? (
    <View style={styles.container}>
      <AnimatedLottieView
        source={Images.loading2}
        autoPlay
        speed={3}
        style={styles.animated}
        loop
      />
    </View>
  ) : null
})

export default LoadingScreen

const themedStyles = StyleService.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  animated: {
    width: 300,
    height: 300
  }
})
