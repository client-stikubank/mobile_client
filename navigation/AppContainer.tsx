import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LogBox } from 'react-native'
import { useSelector } from 'react-redux'

import LoadingScreen from 'components/LoadingScreen'

import Onboarding from 'src/onboarding'
import SuccessScr from 'src/SuccessScr'

import InviteAndWin from 'src/home/InviteAndWin'
import FavoritesFilter from 'src/home/MyFavorites/FavoritesFilter'
import SelectLanguage from 'src/home/MyFavorites/SelectLanguage'
import FavoritesMap from 'src/home/MyFavorites/FavoritesMap'
import Notification from 'src/home/Notification'

import CaregiverProfile from 'src/find/CaregiverProfile'
import ProfileGallery from 'src/find/ProfileGallery'
import WriteReview from 'src/find/WriteReview'
import ViewOnMap from 'src/find/ViewOnMap'

import AddMorePayment from 'src/more/AddMorePayment/AddMorePayment'
import CampList from 'src/home/CampList'
import CampSchedule from 'src/home/CampSchedule'
import CaregiverPostDetails from 'src/more/CaregiverPostDetails'
import AddChild from 'src/more/MyChildren/AddChild'

import AuthNavigator from './AuthNavigator'
import CreateJobNavigator from './CreateJobNavigator'
import MainBottomTab from './MainBottomTab'
import MessagesNavigator from './MessagesNavigator'
import MoreNavigator from './MoreNavigator'
import RequestsStackNavigator from './RequestStackNavigator'
import { RootStackParamList } from './types'

const Stack = createStackNavigator<RootStackParamList>()

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

const AppContainer = () => {
  const { screen } = useSelector((state: any) => ({
    screen: state.Loading.screen
  }))

  return (
    <NavigationContainer>
      <LoadingScreen show={screen} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Intro'}
      >
        <Stack.Screen name='Intro' component={Onboarding} />
        <Stack.Screen name='AuthStack' component={AuthNavigator} />

        <Stack.Screen name='FavoritesFilter' component={FavoritesFilter} />
        <Stack.Screen name='SelectLanguage' component={SelectLanguage} />
        <Stack.Screen name='FavoritesMap' component={FavoritesMap} />
        <Stack.Screen name='Notification' component={Notification} />
        <Stack.Screen name='InviteAndWin' component={InviteAndWin} />
        <Stack.Screen name='CampList' component={CampList} />
        <Stack.Screen name='CampSchedule' component={CampSchedule} />
        <Stack.Screen name='ViewOnMap' component={ViewOnMap} />
        <Stack.Screen name='CaregiverProfile' component={CaregiverProfile} />
        <Stack.Screen name='ProfileGallery' component={ProfileGallery} />
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
