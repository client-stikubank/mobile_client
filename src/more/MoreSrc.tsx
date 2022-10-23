import React, { memo, useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  NavigationProp,
  useNavigation,
  CommonActions
} from '@react-navigation/native'
import { StyleService, useStyleSheet } from '@ui-kitten/components'

import { Images } from 'assets/images'
import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import { RootStackParamList } from 'navigation/types'
import { logoutUser } from 'store/actions'

import ButtonOptional, {
  ButtonOptionalProps
} from './Components/ButtonOptional'
import HeaderMoreOption from './Components/HeaderMoreOption'

const MoreSrc = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>()
  const { t } = useTranslation(['more', 'payment', 'common'])
  const reduxDispatch = useDispatch()

  const { auth, userProfile } = useSelector((state: any) => ({
    auth: state.Login.auth,
    userProfile: state.UserProfile.userProfile
  }))

  const DATA_DETAILS: ButtonOptionalProps[] = [
    {
      title: t('more:my-post'),
      icon: 'myPost',
      status: 'facebook',
      navigateSrc: 'MyPost'
    },
    {
      title: t('more:my-children'),
      icon: 'stats',
      status: 'warning',
      navigateSrc: 'MyChildren'
    },
    {
      title: t('payment:payment-method'),
      icon: 'payment',
      status: 'success',
      navigateSrc: 'PaymentMethod'
    }
  ]

  const nextScreen = useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName
        }
      ]
    })
    dispatch(resetAction)
  }, [])

  const onLogout = () => {
    AsyncStorage.removeItem('credential')
    reduxDispatch(logoutUser(auth, () => nextScreen('AuthStack')))
  }

  return (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <HeaderMoreOption
          name={userProfile?.user_profile.full_name}
          avatar={Images.tokenMamo}
          email={userProfile.email}
        />
        {/* <View style={styles.details}>
          <Text category='h6' bold>
            {t('more:myDetails')}
          </Text>
          {DATA_DETAILS.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                navigateSrc={item.navigateSrc}
              />
            )
          })}
        </View> */}
        <View style={styles.application}>
          {/* <Text category='h6' bold>
            {t('more:application')}
          </Text> */}
          <ButtonOptional
            title={t('more:logout')}
            icon={'changeJob'}
            status={'danger'}
            onPress={onLogout}
            navigateSrc={undefined}
          />
        </View>
      </Content>
    </Container>
  )
})

export default MoreSrc

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80
  },

  details: {
    marginBottom: 48
  },
  application: {}
})
