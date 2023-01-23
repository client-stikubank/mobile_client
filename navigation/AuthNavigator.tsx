import React, { memo, useEffect } from 'react'
import Toast from 'react-native-toast-message'

import Login from 'src/auth/Login/Login'
import ForgotPassword from 'src/auth/ForgotPassword'
import SignupFirstStep from 'src/auth/Signup/SignupFirstStep'
import SignupSecondStep from 'src/auth/Signup/SignupSecondStep'
import SignupThirdStep from 'src/auth/Signup/SignupThirdStep'
import NewPassword from 'src/auth/NewPassword'

import { AuthStackParamList } from './types'
import createStackNavigator from './createStackNavigator'

const Stack = createStackNavigator<AuthStackParamList>()

const AuthNavigator = memo((props: any) => {
  useEffect(() => {
    if (props.route.params?.error == 'Authorize') {
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: 'Authorisasi gagal atau sesi Anda telah habis'
      })
    }
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Login'
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignupFirstStep' component={SignupFirstStep} />
      <Stack.Screen name='SignupSecondStep' component={SignupSecondStep} />
      <Stack.Screen name='SignupThirdStep' component={SignupThirdStep} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='NewPassword' component={NewPassword} />
    </Stack.Navigator>
  )
})

export default AuthNavigator
