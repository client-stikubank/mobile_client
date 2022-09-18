import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import * as eva from '@eva-design/eva'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'

import AssetIconsPack from 'assets/AssetIconsPack'
import DebugConfig from 'config/DebugConfig'
import { default as darkTheme } from 'constants/theme/dark.json'
import { default as lightTheme } from 'constants/theme/light.json'
import { default as customTheme } from 'constants/theme/appTheme.json'
import { default as customMapping } from 'constants/theme/mapping.json'
import useCachedResources from 'hooks/useCachedResources'
import AppContainer from 'navigation/AppContainer'
import createStore from 'store'

import ThemeContext from './ThemeContext'
import './i18n'

declare global {
  interface Console {
    tron: any
  }
}

const store = createStore()

function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    AsyncStorage.getItem('theme').then(value => {
      if (value === 'light' || value === 'dark') setTheme(value)
    })
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    AsyncStorage.setItem('theme', nextTheme).then(() => {
      setTheme(nextTheme)
    })
  }
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
            <ApplicationProvider
              {...eva}
              theme={
                theme === 'light'
                  ? { ...eva.light, ...customTheme, ...lightTheme }
                  : { ...eva.dark, ...customTheme, ...darkTheme }
              }
              /* @ts-ignore */
              customMapping={customMapping}
            >
              <SafeAreaProvider>
                <StatusBar
                  style={theme === 'light' ? 'dark' : 'light'}
                  translucent={true}
                  backgroundColor={'#00000000'}
                />
                <AppContainer />
              </SafeAreaProvider>
            </ApplicationProvider>
          </ThemeContext.Provider>
          <Toast />
        </Provider>
      </SafeAreaProvider>
    )
  }
}

export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
