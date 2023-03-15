import React, { memo, useCallback, useEffect, useState } from 'react'
import { Platform, View } from 'react-native'
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
  Layout,
  Button
} from '@ui-kitten/components'
import { capitalize } from 'lodash'

import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import SelectPicker from 'components/SelectPicker'
import DatePicker from 'components/DatePicker'
import { submitDate } from 'helpers/date'
import { RootStackParamList } from 'navigation/types'
import {
  collectRegister,
  register,
  getProvinces,
  getCities
} from 'store/actions'
import { RuleRequired } from 'utils/rules'

const SignupThirdStep = memo(() => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['auth', 'success'])
  const [toggleCalendar, setToggleCalendar] = useState(false)

  const { form, provinces, cities } = useSelector((state: any) => ({
    form: state.Register.form,
    provinces: state.Province.provinces,
    cities: state.City.cities
  }))

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      birth_date: new Date(2000, 0, 1),
      province_id: '',
      city_id: '',
      reffering_code: ''
    }
  })

  useEffect(() => {
    reduxDispatch(getProvinces())
  }, [])

  useEffect(() => {
    if (watch('province_id')) {
      reduxDispatch(
        getCities({
          query: {
            province_id_eq: watch('province_id')
          }
        })
      )
    }
  }, [watch('province_id')])

  const handleSignup = useCallback((data: any) => {
    const userProfile = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      birth_date: submitDate(data.birth_date),
      city_id: data.city_id
    }
    const sendData = {
      ...form,
      user_profile: userProfile,
      reffering_code: data.reffering_code
    }

    reduxDispatch(collectRegister(sendData))
    reduxDispatch(
      register(sendData, () =>
        navigate('SuccessScr', {
          successScr: {
            title: t('success:register'),
            logo: true,
            description: t('success:register_description'),
            actions: [
              {
                title: t('success:lets_go_button'),
                onPress: () => navigate('MainBottomTab'),
                status: 'basic'
              }
            ],
            buttonsViewStyle: { marginHorizontal: 68 }
          }
        })
      )
    )
  }, [])

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('auth:sign_up')}
        accessoryLeft={<NavigationAction />}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={Platform.OS === 'android' ? 14 : 70}
        extraScrollHeight={Platform.OS === 'android' ? 14 : 70}
        scrollEnabled={true}
        enableAutomaticScroll={true}
      >
        <View>
          <Content padder>
            <Text mt={16}>{t('auth:signup_3')}</Text>
            <Text mt={8} mb={16} category='h2'>
              {t('auth:signup_3_description')}
            </Text>
            <Controller
              control={control}
              name='first_name'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth:first_name').toString()}
                  status={errors.first_name ? 'warning' : 'basic'}
                  style={styles.input}
                  value={capitalize(value)}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='default'
                  caption={errors.first_name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='last_name'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth:last_name').toString()}
                  status={errors.last_name ? 'warning' : 'basic'}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='default'
                  caption={errors.last_name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='phone_number'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth:phone_number').toString()}
                  status={errors.phone_number ? 'warning' : 'basic'}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='phone-pad'
                  caption={errors.phone_number?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='birth_date'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  label={t('auth:birth_date')}
                  time={value}
                  show={toggleCalendar}
                  onChange={onChange}
                  setShow={setToggleCalendar}
                  style={styles.datepicker}
                />
              )}
            />

            <Controller
              control={control}
              name='province_id'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectPicker
                  label={t('auth:province')}
                  items={provinces}
                  onChange={onChange}
                  value={value || null}
                  errors={!!errors.province_id}
                  errorMessage={errors.province_id?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='city_id'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectPicker
                  label={t('auth:city')}
                  items={cities}
                  onChange={onChange}
                  value={value || null}
                  errors={!!errors.city_id}
                  errorMessage={errors.city_id?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='reffering_code'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth:reffering_code').toString()}
                  status={errors.reffering_code ? 'warning' : 'basic'}
                  style={styles.input}
                  value={value.toUpperCase()}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='default'
                  caption={errors.reffering_code?.message}
                />
              )}
            />
          </Content>
          <Layout style={styles.bottom}>
            <Button
              children={t('auth:sign_up')}
              onPress={handleSubmit(handleSignup)}
            />
          </Layout>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
})

export default SignupThirdStep

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 24
  },
  datepicker: {
    marginBottom: 24
  },
  bottom: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingBottom: 24
  }
})
