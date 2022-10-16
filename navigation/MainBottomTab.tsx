import React, { memo, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService
} from '@ui-kitten/components'

import Text from 'components/Text'
import useLayout from 'hooks/useLayout'
import useModal from 'hooks/useModal'
import { authSessionCheck } from 'lib/Session'
import { globalStyle } from 'styles/globalStyle'
import { getUserProfile } from 'store/actions'

import { MainBottomTabStackParamList } from './types'
import MoreNavigator from './MoreNavigator'
import HomeStackNavigator from './HomeStackNavigator'

import ModalRequest from 'components/ModalRequest'
import { Images } from 'assets/images'
import HomeSrc from 'src/home/HomeSrc'
import FindScreen from 'src/find/FindScreen'
import MessagesScreen from 'src/messages/MessagesScreen'
import RequestsBottomNavigator from './RequestsBottomNavigator'

interface ButtonTabProps {
  focused: boolean
  icon: string
  numberNotification?: number
  onPress?: void
}

const BottomTab = createBottomTabNavigator<MainBottomTabStackParamList>()

const MainBottomTab = memo(() => {
  // const reduxDispatch = useDispatch()
  const theme = useTheme()
  const { height, bottom } = useLayout()
  const { modalRef, show, hide } = useModal()
  const styles = useStyleSheet(themedStyles)

  const { auth } = useSelector((state: any) => ({
    auth: state.Login.auth
  }))

  const ButtonTab = React.useCallback(
    ({ focused, icon, numberNotification }: ButtonTabProps) => {
      React.useEffect(() => {
        if (focused && icon == 'bookmark') {
          setTimeout(() => {
            modalRef.current?.show()
          }, 1200)
          clearTimeout
        } else {
          modalRef.current?.hide()
        }
      }, [focused])
      return (
        <View
          style={{
            width: 40,
            height: 40,
            ...globalStyle.center
          }}
        >
          {numberNotification ? (
            focused ? null : (
              <View style={styles.notification}>
                <Text center category='h9' status='primary' mt={1.5}>
                  {numberNotification}
                </Text>
              </View>
            )
          ) : null}
          <Icon
            pack='assets'
            name={!focused ? icon : `${icon}Active`}
            style={{
              width: 24,
              height: 24,
              tintColor: focused
                ? theme['button-basic-color']
                : theme['text-placeholder-color']
            }}
          />
        </View>
      )
    },
    [modalRef]
  )

  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: styles.styleLabel,
          tabBarStyle: [
            styles.tabBarStyle,
            {
              height: (54 + bottom) * (height / 812)
            }
          ]
        }}
      >
        <BottomTab.Screen
          name='Home'
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <ButtonTab
                focused={focused}
                icon='home'
                numberNotification={undefined}
              />
            )
          }}
        />
        {/* <BottomTab.Screen
          name="Find"
          component={FindScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <ButtonTab
                focused={focused}
                icon="search"
                numberNotification={undefined}
              />
            ),
          }}
        /> */}
        {/* <BottomTab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <ButtonTab
                focused={focused}
                icon="comment"
                numberNotification={1}
              />
            ),
          }}
        /> */}
        {/* <BottomTab.Screen
          name="Requests"
          component={RequestsBottomNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <ButtonTab
                focused={focused}
                icon="bookmark"
                numberNotification={undefined}
              />
            ),
          }}
        /> */}
        <BottomTab.Screen
          name='More'
          component={MoreNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <ButtonTab focused={focused} icon='more' />
            )
          }}
        />
      </BottomTab.Navigator>
      {/* Modal request job notification*/}
      {/* <ModalRequest
        name={'Marian Ramsey'}
        ref={modalRef}
        avatar={Images.avatar3}
        isOnl={true}
        onDetails={hide}
      /> */}
    </View>
  )
})
export default MainBottomTab

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -44,
    paddingTop: 12
  },
  styleLabel: {
    color: 'color-primary-100',
    fontSize: 11,
    lineHeight: 24
  },
  buttonTab: {
    borderRadius: 12,
    height: 40,
    width: 40
  },
  notification: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: 'button-basic-color',
    width: 16,
    height: 16,
    zIndex: 10,
    top: 2,
    right: 1
  }
})
