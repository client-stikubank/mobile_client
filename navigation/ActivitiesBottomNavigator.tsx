import { createStackNavigator } from '@react-navigation/stack'
import React, { memo } from 'react'
import RequestsInPast from 'src/requests/RequestsInPass'
import Activities from 'src/requests/Activities'

import { ActivitiesBottomNavigatorParamList } from './types'

const Stack = createStackNavigator<ActivitiesBottomNavigatorParamList>()
const ActivitiesBottomNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Activities'
    >
      <Stack.Screen name='Activities' component={Activities} />
      <Stack.Screen name='RequestsInPast' component={RequestsInPast} />
    </Stack.Navigator>
  )
})
export default ActivitiesBottomNavigator
