import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import Immutable from 'seamless-immutable'

import Config from 'config/DebugConfig'

const reactotron = Reactotron.configure({ host: '192.168.1.217' })
  .useReactNative()
  .use(reduxPlugin({ onRestore: Immutable }))
  .use(sagaPlugin())

if (Config.useReactotron) {
  reactotron.connect()
  reactotron.clear()
}
export default reactotron
console.tron = reactotron
