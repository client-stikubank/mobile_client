import React, { memo, useCallback } from 'react'
import { TouchableOpacity, Platform, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Layout,
  Button
} from '@ui-kitten/components'

import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import useToggle from 'hooks/useToggle'
import { AuthStackParamList } from 'navigation/types'
import { collectRegister } from 'store/actions'
import { RuleEmail, RulePassword } from 'utils/rules'

const SignupSecondStep = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['auth', 'success', 'common'])
  const reduxDispatch = useDispatch()

  const [invisible, setInvisible] = useToggle(true)

  const { form } = useSelector((state: any) => ({
    form: state.Register.form
  }))

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    }
  })

  const handleSignup = useCallback(data => {
    reduxDispatch(collectRegister({ ...form, ...data }))
    navigate('SignupThirdStep')
    // navigate('SuccessScr', {
    //   successScr: {
    //     title: t('success:title_2'),
    //     logo: true,
    //     description: t('success:description_2'),
    //     children: [
    //       {
    //         title: t('success:see_your_dashboard'),
    //         onPress: () => navigate('MainBottomTab'),
    //         status: 'outline'
    //       },
    //       {
    //         title: t('success:create_new_job'),
    //         onPress: () => navigate('MainBottomTab'),
    //         status: 'basic'
    //       }
    //     ],
    //     buttonsViewStyle: { marginHorizontal: 68 }
    //   }
    // })
  }, [])

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('auth:sign_up')}
        accessoryLeft={<NavigationAction />}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={Platform.OS === 'android' ? 14 : 32}
        extraScrollHeight={Platform.OS === 'android' ? 14 : 32}
        scrollEnabled={true}
        enableAutomaticScroll={true}
      >
        <View>
          <Content padder>
            <Text mt={16}>{t('auth:heading_signup_2')}</Text>
            <Text mt={8} mb={16} category='h2'>
              {t('auth:title_signup_2')}
            </Text>
            <Text mt={8} mb={48}>
              {t('auth:description_signup_2')}
            </Text>
            {/* <Controller
                control={control}
                name='full_name'
                rules={RuleName}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth:full_name').toString()}
                    status={errors.full_name ? 'warning' : 'basic'}
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onTouchStart={handleSubmit(() => {})}
                    onTouchEnd={handleSubmit(() => {})}
                    onBlur={onBlur}
                    keyboardType='email-address'
                    caption={errors.full_name?.message}
                  />
                )}
              /> */}
            <Controller
              control={control}
              name='email'
              rules={RuleEmail}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth:email').toString()}
                  status={errors.email ? 'warning' : 'basic'}
                  style={styles.input}
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
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='default'
                  caption={errors.password?.message}
                  secureTextEntry={invisible}
                  accessoryRight={props => (
                    <TouchableOpacity
                      activeOpacity={0.54}
                      onPress={setInvisible}
                    >
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
            <Controller
              control={control}
              name='password_confirmation'
              rules={{
                ...RulePassword,
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Konfirmasi Password tidak cocok'
                  }
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth:password_confirmation').toString()}
                  status={errors.password_confirmation ? 'warning' : 'basic'}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='default'
                  caption={errors.password_confirmation?.message}
                  secureTextEntry={invisible}
                  accessoryRight={props => (
                    <TouchableOpacity
                      activeOpacity={0.54}
                      onPress={setInvisible}
                    >
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
          </Content>

          <Layout style={styles.bottom}>
            <Button
              children={t('auth:next')}
              onPress={handleSubmit(handleSignup)}
            />
          </Layout>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
})

export default SignupSecondStep

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 24
  },
  bottom: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingBottom: 24
  }
})
