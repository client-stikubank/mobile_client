import React, { memo, useEffect, useCallback, useState } from 'react'
import { Image, TouchableOpacity, Platform } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button
} from '@ui-kitten/components'
import {
  CommonActions,
  NavigationProp,
  useNavigation
} from '@react-navigation/native'

import { Images } from 'assets/images'
import Container from 'components/Container'
import Flex from 'components/Flex'
import Text from 'components/Text'
import useToggle from 'hooks/useToggle'
import { RootStackParamList } from 'navigation/types'
import { loginUser } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'
import { RuleEmail, RulePassword } from 'utils/rules'

const Login = memo(() => {
  const reduxDispatch = useDispatch()
  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['auth', 'common'])

  const [canContinue, setCanContinue] = useState(false)
  const [invisible, setInvisible] = useToggle(true)

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

  const onLogin = (data: any) => {
    reduxDispatch(loginUser(data, () => nextScreen('MainBottomTab')))
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'user_client01@mailinator.com',
      password: 'Admin123!'
    }
  })

  useEffect(() => {
    if (errors.email === undefined && errors.password === undefined) {
      setCanContinue(false)
    } else {
      setCanContinue(true)
    }
  }, [errors.email, errors.password])

  const onAuth = React.useCallback(
    screen => () => {
      navigate('AuthStack', { screen: screen })
    },
    []
  )

  return (
    <Container style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={Platform.OS === 'android' ? 250 : 0}
        extraScrollHeight={Platform.OS === 'android' ? 250 : 0}
        scrollEnabled={false}
        enableAutomaticScroll={true}
        contentContainerStyle={styles.content}
      >
        <Image source={Images.logo} />
        <Text mt={24} category='h7' mb={72}>
          {t('auth:welcome_back')}
        </Text>
        <Controller
          control={control}
          name='email'
          rules={RuleEmail}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth:email').toString()}
              status={errors.email ? 'warning' : 'basic'}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType='email-address'
              caption={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          rules={RulePassword}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth:password').toString()}
              status={errors.password ? 'warning' : 'basic'}
              style={styles.password}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType='default'
              caption={errors.password?.message}
              secureTextEntry={invisible}
              accessoryRight={props => (
                <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                  <Icon
                    {...props}
                    pack='assets'
                    name={!invisible ? 'eyeOn' : 'eyeOff'}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        />
        <Flex mv={16} />
        <Button
          onPress={handleSubmit(onLogin)}
          disabled={canContinue}
          style={globalStyle.shadowBtn}
        >
          {t('auth:login').toString()}
        </Button>
        <Flex>
          <TouchableOpacity
            activeOpacity={0.54}
            onPress={onAuth('ForgetPassword')}
            style={styles.forgetPass}
          >
            <Text
              category='h8-s'
              status={'placeholder'}
              mv={24}
              center
              underline
            >
              {t('auth:forgot_password')}?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.54}
            onPress={onAuth('SignupFirstStep')}
            style={styles.forgetPass}
          >
            <Text
              category='h8-s'
              status={'placeholder'}
              mv={24}
              center
              underline
            >
              {t('auth:sign_up_link')}
            </Text>
          </TouchableOpacity>
        </Flex>
      </KeyboardAwareScrollView>
    </Container>
  )
})

export default Login

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    marginTop: 40,
    paddingHorizontal: 24,
    zIndex: 10,
    flex: 1
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 24
  },
  password: {
    borderBottomWidth: 2
  },
  facebook: {
    marginBottom: 16,
    flex: 1
  },
  logoSocial: {
    position: 'absolute',
    left: 16,
    top: 14
  },
  bottom: {
    position: 'absolute',
    bottom: 0
  },
  forgetPass: {
    alignSelf: 'center'
  }
})
