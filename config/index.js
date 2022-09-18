import { LogBox } from 'react-native'

import DebugConfig from './DebugConfig'
import AppConfig from './AppConfig' // eslint-disable-line no-unused-vars

if (__DEV__) {
  LogBox.ignoreAllLogs() = !DebugConfig.yellowBox
}
