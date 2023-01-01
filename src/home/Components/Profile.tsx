import React, { memo, useEffect } from 'react'
import {
  View,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
  Image as ImageReact
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Icon,
  Button
} from '@ui-kitten/components'
import { isEmpty } from 'lodash'
import Ionicons from '@expo/vector-icons/Ionicons'
import Swiper from 'react-native-swiper'

import { Images } from 'assets/images'
import Text from 'components/Text'
import Flex from 'components/Flex'
import LottieAnimation from 'components/LottieAnimation'
import { defaultDate } from 'helpers/date'
import { RootStackParamList } from 'navigation/types'
import { getUserProfile, getUserCarnivalGifts } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'

const Profile = memo(() => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const { userProfile, userCarnivalGifts, ucGiftPaginations, ucGiftParams } =
    useSelector((state: any) => ({
      userProfile: state.UserProfile.userProfile,
      userCarnivalGifts: state.UserCarnivalGift.userCarnivalGifts,
      ucGiftPaginations: state.UserCarnivalGift.pagination,
      ucGiftParams: state.UserCarnivalGift.currentParams
    }))

  const { user_profile } = userProfile

  useEffect(() => {
    reduxDispatch(getUserProfile())
    reduxDispatch(getUserCarnivalGifts(ucGiftParams))
  }, [])

  const _onAdditionalProfile = () => navigate('AdditionalProfile')
  const _onEditProfile = () => navigate('EditProfile')

  const renderPagination = (index: number, total: number, context: Swiper) => {
    return (
      <Flex itemsCenter justify='center'>
        <Text status='info' category='h7'>
          {index + 1}/{ucGiftPaginations.count}
        </Text>
      </Flex>
    )
  }

  const loadMoreGifts = (index: number) => {
    if (index >= ucGiftPaginations.count - 2 && ucGiftPaginations.next) {
      reduxDispatch(
        getUserCarnivalGifts({
          ...ucGiftParams,
          page: ucGiftPaginations.current + 1
        })
      )
    }
  }

  return (
    <View style={styles.carnivalContainer}>
      <Text style={styles.subTitle} category='h6'>
        I am
      </Text>
      <Layout level={'2'} style={styles.content}>
        <TouchableOpacity onPress={_onEditProfile} style={styles.editAction}>
          <Icon pack='assets' name='edit' style={styles.icon} />
        </TouchableOpacity>
        <Flex alignItems='flex-start' justify='flex-start'>
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
      <Text style={styles.subTitle} category='h6' mt={24}>
        My Kado
      </Text>
      {userCarnivalGifts.length > 0 && (
        <Flex mh={-24}>
          <Swiper
            style={styles.swiper}
            loop={false}
            renderPagination={renderPagination}
            onIndexChanged={index => loadMoreGifts(index)}
          >
            {userCarnivalGifts.map((carnivalGift: any) => (
              <View style={styles.giftCardWrapper} key={carnivalGift.id}>
                <View style={styles.giftCard}>
                  {carnivalGift.status == 'paid' && (
                    <Flex
                      style={styles.overlayOutStock}
                      justify='center'
                      itemsCenter
                    >
                      <Ionicons
                        name='md-checkmark-circle'
                        size={48}
                        color='#00D65B'
                      />
                    </Flex>
                  )}
                  <Text
                    category='h7'
                    numberOfLines={2}
                    style={{ color: 'white', height: 36 }}
                    center
                  >
                    {carnivalGift.gift.name}
                  </Text>
                  <Flex
                    style={styles.imageWrapper}
                    itemsCenter
                    justify='center'
                  >
                    {!carnivalGift.out_of_stock && (
                      <LottieAnimation
                        source={Images.giftLight}
                        autoPlay
                        loop
                        resizeMode='cover'
                      />
                    )}
                    <ImageReact
                      source={{ uri: carnivalGift.gift.image.url }}
                      style={{ height: 150, aspectRatio: 1 }}
                      resizeMode='contain'
                    />
                  </Flex>
                  {/* <Flex justify='space-between'>
                    <Button
                      status='control'
                      size='medium'
                      style={{ width: '31.5%' }}
                    >
                      <Flex itemsCenter>
                        <Ionicons name='qr-code' size={14} color='black' />
                        <Text category='h8' ml={4}>
                          Scan
                        </Text>
                      </Flex>
                    </Button>
                    <Button
                      status='control'
                      size='medium'
                      style={{ width: '31.5%' }}
                    >
                      <Flex itemsCenter>
                        <Ionicons
                          name='remove-circle-outline'
                          size={14}
                          color='black'
                        />
                        <Text category='h8' ml={4}>
                          Batal
                        </Text>
                      </Flex>
                    </Button>
                    <Button
                      status='control'
                      size='medium'
                      style={{ width: '31.5%' }}
                    >
                      <Flex itemsCenter>
                        <Ionicons
                          name='remove-circle-outline'
                          size={14}
                          color='black'
                        />
                        <Text category='h8' ml={4}>
                          Batal
                        </Text>
                      </Flex>
                    </Button>
                  </Flex> */}
                  <Flex
                    style={styles.tokens}
                    justify='center'
                    itemsCenter
                    center
                  >
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenBeryl]}
                        itemsCenter
                      >
                        <Text category='h5' bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[0]}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenAle]}
                        itemsCenter
                      >
                        <Text category='h5' bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[1]}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenJenny]}
                        itemsCenter
                      >
                        <Text category='h5' bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[2]}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenMamo]}
                        itemsCenter
                      >
                        <Text category='h5' bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[3]}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </View>
              </View>
            ))}
          </Swiper>
        </Flex>
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
  },
  swiper: {
    height: 400,
    paddingBottom: 16
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },
  giftCardWrapper: {
    paddingHorizontal: 24,
    ...globalStyle.shadow
  },
  giftCard: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'color-success-200',
    position: 'relative',
    overflow: 'hidden'
  },
  imageWrapper: {
    height: 260,
    marginTop: -35,
    marginBottom: -25,
    overflow: 'visible'
  },
  bookGift: {
    backgroundColor: 'color-mamo',
    borderColor: 'color-mamo',
    textAlign: 'center'
  },
  tokens: {
    overflow: 'hidden',
    marginHorizontal: -12,
    marginBottom: -12,
    marginTop: 16
  },
  token: {
    width: '25%'
  },
  tokenMamo: {
    backgroundColor: 'color-mamo',
    paddingHorizontal: 6,
    borderBottomRightRadius: 15
  },
  tokenAle: {
    backgroundColor: 'color-ale',
    paddingHorizontal: 6
  },
  tokenBeryl: {
    backgroundColor: 'color-beryl',
    paddingHorizontal: 6,
    borderBottomLeftRadius: 15
  },
  tokenJenny: {
    backgroundColor: 'color-jenny',
    paddingHorizontal: 6
  },
  tokenAmount: {
    // height: 48,
    aspectRatio: 2,
    ...globalStyle.center
  },
  tokenText: {
    color: '#FFF'
  },
  overlayOutStock: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '115%',
    height: '109%',
    backgroundColor: 'rgba(29, 30, 44, 0.8)',
    zIndex: 1
  }
})
