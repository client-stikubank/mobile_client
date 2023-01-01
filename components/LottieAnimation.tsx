import React, { useState, useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import Lottie from 'lottie-react-native'

export const LottieAnimation = (props: any) => {
  const [appState, setAppState] = useState(AppState.currentState)
  const ref = useRef<Lottie>()

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange
    )
    return () => subscription.remove()
  }, [appState])

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    setAppState(nextAppState)
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      if (ref.current) {
        ref.current!.play()
      }
    }
    setAppState(nextAppState)
  }

  return <Lottie ref={ref} autoPlay={true} {...props} />
}

export default LottieAnimation
