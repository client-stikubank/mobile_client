import React, { memo, useEffect } from 'react'
import {
  View,
  Platform,
  StyleProp,
  ImageStyle,
  TouchableOpacity
} from 'react-native'
import Image from 'react-native-scalable-image'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Icon
} from '@ui-kitten/components'
import { isEmpty } from 'lodash'

import useLayout from 'hooks/useLayout'
import { Images } from 'assets/images'
import Text from 'components/Text'
import Flex from 'components/Flex'
import NavigationAction from 'components/NavigationAction'
import { defaultDate } from 'helpers/date'
import { RootStackParamList } from 'navigation/types'
import { getUserProfile } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'

const Profile = memo(() => {
  const reduxDispatch = useDispatch()
  const theme = useTheme()
  const { width } = useLayout()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const { userProfile } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile
  }))

  const { user_profile } = userProfile

  useEffect(() => {
    reduxDispatch(getUserProfile())
  }, [])

  const _onAdditionalProfile = () => navigate('AdditionalProfile')
  const _onEditProfile = () => navigate('EditProfile')

  return (
    <View style={styles.carnivalContainer}>
      <Text style={styles.subTitle} category='h6'>
        I am
      </Text>
      <Layout level={'2'} style={styles.content}>
        <TouchableOpacity onPress={_onEditProfile} style={styles.editAction}>
          <Icon pack='assets' name='edit' style={styles.icon} />
        </TouchableOpacity>
        <Flex alignItems='start' justify='flex-start'>
          <Avatar
            style={styles.avatar as StyleProp<ImageStyle>}
            source={Images.tokenMamo}
            size='giant'
            shape='round'
          />
          <Flex vertical style={styles.profileItems}>
            <Text category='h7' style={{ marginBottom: 8 }}>
              {user_profile?.full_name}
            </Text>
            <Flex vertical style={styles.additionalItem}>
              <Text category='h8'>Tanggal Lahir</Text>
              <Text category='h8-s'>
                {defaultDate(user_profile?.birth_date)}
              </Text>
            </Flex>
            <Flex vertical style={styles.additionalItem}>
              <Text category='h8'>Nomor HP</Text>
              <Text category='h8-s'>{user_profile?.phone_number}</Text>
            </Flex>
            <Flex vertical style={styles.additionalItem}>
              <Text category='h8'>Email</Text>
              <Text category='h8-s'>{userProfile?.email}</Text>
            </Flex>
            <Flex vertical style={styles.additionalItem}>
              <Text category='h8'>Asal Kota</Text>
              <Text category='h8-s'>{user_profile?.city?.name}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
      {isEmpty(user_profile?.additional_info) ? (
        <TouchableOpacity onPress={_onAdditionalProfile}>
          <Text status={'info'} category='h8' bold mr={4}>
            {t('home:fill_additional_profile_student')}
          </Text>
        </TouchableOpacity>
      ) : (
        <Layout level={'2'} style={styles.content}>
          <TouchableOpacity
            onPress={_onAdditionalProfile}
            style={styles.editAction}
          >
            <Icon pack='assets' name='edit' style={styles.icon} />
          </TouchableOpacity>
          <View>
            <Flex vertical style={styles.additionalItem}>
              <Text category='h8'>Pendidikan</Text>
              <Text category='h8-s'>
                {user_profile?.additional_info.education_status_name}
              </Text>
            </Flex>
            <Flex vertical>
              <Text category='h8'>Sekolah</Text>
              <Text category='h8-s'>
                {user_profile?.additional_info.previous_school}
              </Text>
            </Flex>
          </View>
        </Layout>
      )}
    </View>
  )
})

export default Profile

const themedStyles = StyleService.create({
  carnivalContainer: {
    marginVertical: 16,
    paddingHorizontal: 24
  },
  subTitle: {
    marginBottom: 8
  },
  content: {
    position: 'relative',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...globalStyle.shadow
  },
  avatar: {
    backgroundColor: 'color-mamo',
    marginRight: 16,
    width: '30%'
  },
  icon: {
    width: 18,
    height: 18
  },
  profileItems: {
    width: '70%',
    paddingRight: 16
  },
  editAction: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 3,
    elevation: 3
  },
  additionalItem: {
    marginBottom: 8
  }
})
