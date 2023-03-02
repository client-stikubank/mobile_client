import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import LoadingScreen from 'components/LoadingScreen'
import { responseError, logoutUser } from 'store/actions'

import Onboarding from 'src/onboarding'
import SuccessScr from 'src/SuccessScr'

import InviteAndWin from 'src/home/InviteAndWin'
import QrActivities from 'src/home/QrActivities'
import AdditionalProfile from 'src/home/AdditionalProfile'
import EditProfile from 'src/home/EditProfile'
import EditAccount from 'src/home/EditAccount'
import GiftScanner from 'src/home/GiftScanner'
import AttendanceScanner from 'src/home/AttendanceScanner'
import SelectLanguage from 'src/home/MyFavorites/SelectLanguage'
import FavoritesMap from 'src/home/MyFavorites/FavoritesMap'
import Notification from 'src/home/Notification'

import CaregiverProfile from 'src/find/CaregiverProfile'
import WriteReview from 'src/find/WriteReview'
import ViewOnMap from 'src/find/ViewOnMap'

import AddMorePayment from 'src/more/AddMorePayment/AddMorePayment'
import CampList from 'src/home/CampList'
import CampSchedule from 'src/home/CampSchedule'
import Assessment from 'src/home/Assessment'
import AssessmentAnswer from 'src/home/AssessmentAnswer'
import AssessmentDetail from 'src/home/AssessmentDetail'
import RedeemGift from 'src/home/RedeemGift'
import CaregiverPostDetails from 'src/more/CaregiverPostDetails'
import AddChild from 'src/more/MyChildren/AddChild'

import AuthNavigator from './AuthNavigator'
import CreateJobNavigator from './CreateJobNavigator'
import MainBottomTab from './MainBottomTab'
import MessagesNavigator from './MessagesNavigator'
import MoreNavigator from './MoreNavigator'
import RequestsStackNavigator from './RequestStackNavigator'
import { RootStackParamList } from './types'
import { navigationRef } from './RootNavigation'
import * as RootNavigation from './RootNavigation.js'

const Stack = createStackNavigator<RootStackParamList>()

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

const AppContainer = () => {
  const reduxDispatch = useDispatch()
  const { auth, screen, error } = useSelector((state: any) => ({
    auth: state.Login.auth,
    screen: state.Loading.screen,
    error: state.Error.error
  }))

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        AsyncStorage.removeItem('credential')
        reduxDispatch(
          logoutUser(auth, () =>
            RootNavigation.navigate('AuthStack', { error: 'Authorize' })
          )
        )

        reduxDispatch(responseError(false))
      }
    }
  }, [error])

  return (
    <NavigationContainer ref={navigationRef}>
      <LoadingScreen show={screen} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'AuthStack'}
      >
        <Stack.Screen name='Intro' component={Onboarding} />
        <Stack.Screen name='AuthStack' component={AuthNavigator} />

        {/* <Stack.Screen name='FavoritesFilter' component={FavoritesFilter} /> */}
        <Stack.Screen name='SelectLanguage' component={SelectLanguage} />
        <Stack.Screen name='FavoritesMap' component={FavoritesMap} />
        <Stack.Screen name='Notification' component={Notification} />
        <Stack.Screen name='InviteAndWin' component={InviteAndWin} />
        <Stack.Screen name='QrActivities' component={QrActivities} />
        <Stack.Screen name='AdditionalProfile' component={AdditionalProfile} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='EditAccount' component={EditAccount} />
        <Stack.Screen name='GiftScanner' component={GiftScanner} />
        <Stack.Screen name='AttendanceScanner' component={AttendanceScanner} />
        <Stack.Screen name='CampList' component={CampList} />
        <Stack.Screen name='CampSchedule' component={CampSchedule} />
        <Stack.Screen name='Assessment' component={Assessment} />
        <Stack.Screen
          name='AssessmentAnswer'
          component={AssessmentAnswer}
          options={{
            headerLeft: () => null
          }}
        />
        <Stack.Screen name='AssessmentDetail' component={AssessmentDetail} />
        <Stack.Screen name='RedeemGift' component={RedeemGift} />
        <Stack.Screen name='ViewOnMap' component={ViewOnMap} />
        <Stack.Screen name='CaregiverProfile' component={CaregiverProfile} />
        <Stack.Screen name='WriteReview' component={WriteReview} />

        <Stack.Screen name='CreateJobStack' component={CreateJobNavigator} />
        <Stack.Screen name='MessagesStack' component={MessagesNavigator} />
        <Stack.Screen name='MainBottomTab' component={MainBottomTab} />
        <Stack.Screen name='RequestStack' component={RequestsStackNavigator} />

        <Stack.Screen name='MoreNavigator' component={MoreNavigator} />
        <Stack.Screen name='AddMorePayment' component={AddMorePayment} />
        <Stack.Screen name='AddChild' component={AddChild} />

        <Stack.Screen
          name='CaregiverPostDetails'
          component={CaregiverPostDetails}
        />

        <Stack.Screen name='SuccessScr' component={SuccessScr} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AppContainer
