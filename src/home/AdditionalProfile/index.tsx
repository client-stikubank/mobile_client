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
  Layout,
  Button
} from '@ui-kitten/components'
import { upperCase } from 'lodash'

import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import SelectPicker from 'components/SelectPicker'
import NavigationAction from 'components/NavigationAction'
import { HomeStackParamList } from 'navigation/types'
import { updateUserProfile } from 'store/actions'
import { RuleRequired } from 'utils/rules'

const EDUCATION_LIST = [
  { value: 'sd', label: 'SD' },
  { value: 'smp', label: 'SMP' },
  { value: 'sma', label: 'SMA/SMK' },
  { value: 'third_diploma', label: 'D3' },
  { value: 'fourth_diploma', label: 'D4' },
  { value: 'first_master', label: 'S1' },
  { value: 'second_master', label: 'S2' },
  { value: 'third_master', label: 'S3' }
]

const AdditionalProfile = memo(() => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'auth', 'common'])
  const reduxDispatch = useDispatch()

  const { userProfile } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile
  }))

  const { user_profile } = userProfile

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: user_profile?.additional_info?.data?.id,
      education_status: user_profile?.additional_info?.education_status,
      previous_school: user_profile?.additional_info?.previous_school
    }
  })

  const handleSignup = useCallback(data => {
    data.previous_school = upperCase(data.previous_school)
    reduxDispatch(
      updateUserProfile({
        user_profile: {
          student_information_attributes: data
        }
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
              {t('home:additional_profile_student')}
            </Text>

            <Controller
              control={control}
              name='id'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input value={value} disabled style={{ display: 'none' }} />
              )}
            />

            <Controller
              control={control}
              name='education_status'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectPicker
                  label='Pilih Pendidikan'
                  items={EDUCATION_LIST}
                  onChange={onChange}
                  value={value || null}
                  errors={!!errors.education_status}
                />
              )}
            />

            <Controller
              control={control}
              name='previous_school'
              rules={RuleRequired}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Asal Sekolah'
                  status={errors.previous_school ? 'warning' : 'basic'}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='default'
                  caption={errors.previous_school?.message}
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

export default AdditionalProfile

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
