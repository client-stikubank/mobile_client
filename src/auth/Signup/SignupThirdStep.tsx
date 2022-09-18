import React, { memo, useCallback } from 'react'
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
  Datepicker,
  NativeDateService,
  Layout,
  Button
} from '@ui-kitten/components'

import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import { RootStackParamList } from 'navigation/types'
import { collectRegister, register } from 'store/actions'
import { RuleRequired } from 'utils/rules'

const SignupThirdStep = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['auth', 'success', 'common'])
  const reduxDispatch = useDispatch()

  const i18n: any = {
    dayNames: {
      short: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      long: ['Mingug', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    },
    monthNames: {
      short: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des'
      ],
      long: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ]
    }
  }

  const localeDateService = new NativeDateService('id', {
    i18n,
    format: 'DD MMMM YYYY'
  })

  const { form } = useSelector((state: any) => ({
    form: state.Register.form
  }))

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: form?.user_profile ? form.user_profile.first_name : null,
      last_name: form?.user_profile ? form.user_profile.last_name : null,
      phone_number: form?.user_profile ? form.user_profile.phone_number : null,
      birth_date: form?.user_profile ? form.user_profile.birth_date : null,
      reffering_code: form.reffering_code
    }
  })

  const handleSignup = useCallback(data => {
    console.tron.log(data)
    const userProfile = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      birth_date: data.birth_date
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
            title: t('success:title_2'),
            logo: true,
            description: t('success:description_2'),
            children: [
              {
                title: t('success:lets_go'),
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
            <Text mt={16}>{t('auth:heading_signup_3')}</Text>
            <Text mt={8} mb={16} category='h2'>
              {t('auth:title_signup_3')}
            </Text>
            <Text mt={8} mb={48}>
              {t('auth:description_signup_3')}
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
                <Datepicker
                  label={t('auth:birth_date')}
                  status={errors.birth_date ? 'warning' : 'basic'}
                  style={styles.datepicker}
                  textStyle={{
                    fontSize: 40
                  }}
                  /* @ts-ignore */
                  placeholder={null}
                  min={new Date(1900, 0, 0)}
                  max={new Date()}
                  onSelect={nextDate => {
                    onChange(nextDate)
                  }}
                  date={value}
                  filter={() => true}
                  dateService={localeDateService}
                  caption={errors.birth_date?.message}
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
                  value={value}
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
