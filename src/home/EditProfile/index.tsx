import React, { memo, useCallback, useEffect } from 'react'
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

import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import DatepickerField from 'components/DatepickerField'
import NavigationAction from 'components/NavigationAction'
import SelectPicker from 'components/SelectPicker'
import { submitDate, toDate } from 'helpers/date'
import { HomeStackParamList } from 'navigation/types'
import { updateUserProfile, getProvinces, getCities } from 'store/actions'
import { RuleRequired } from 'utils/rules'

const EditProfile = memo(() => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'auth', 'common'])
  const reduxDispatch = useDispatch()

  const { userProfile, provinces, cities } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile,
    provinces: state.Province.provinces,
    cities: state.City.cities
  }))

  const { user_profile } = userProfile

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: user_profile?.first_name,
      last_name: user_profile?.last_name,
      phone_number: user_profile?.phone_number,
      birth_date: toDate(user_profile?.birth_date),
      province_id: user_profile?.city?.province?.id,
      city_id: user_profile?.city?.id
    }
  })

  useEffect(() => {
    reduxDispatch(getProvinces({}))
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

  const handleSignup = useCallback(data => {
    data.birth_date = submitDate(data.birth_date)
    reduxDispatch(
      updateUserProfile({
        user_profile: data
      })
    )
    navigate('HomeSrc')
  }, [])

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={Platform.OS === 'android' ? 14 : 32}
        extraScrollHeight={Platform.OS === 'android' ? 14 : 32}
        scrollEnabled={true}
        enableAutomaticScroll={true}
      >
        <View>
          <Content padder>
            <Text mt={8} mb={48} category='h2'>
              {t('auth:title_signup_3')}
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
                  value={value}
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
                <DatepickerField
                  label={t('auth:birth_date')}
                  errors={!!errors.birth_date}
                  errorMessage={errors.birth_date?.message}
                  onChange={onChange}
                  value={value}
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
                  label='Provinsi'
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
                  label='Asal Kota'
                  items={cities}
                  onChange={onChange}
                  value={value || null}
                  errors={!!errors.city_id}
                  errorMessage={errors.city_id?.message}
                />
              )}
            />
          </Content>

          <Layout style={styles.bottom}>
            <Button
              children={t('common:save')}
              onPress={handleSubmit(handleSignup)}
            />
          </Layout>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
})

export default EditProfile

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
