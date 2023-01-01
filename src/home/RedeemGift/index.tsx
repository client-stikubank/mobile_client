import React, { memo } from 'react'
import { View } from 'react-native'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button
} from '@ui-kitten/components'
import { useRoute } from '@react-navigation/native'
import useLayout from 'hooks/useLayout'
import { useTranslation } from 'react-i18next'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, every } from 'lodash'

import { createUserCarnivalGifts, homeDisplay } from 'store/actions'
import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import Flex from 'components/Flex'
import LoadingIndicator from 'components/LoadingIndicator'
import { transpose } from 'helpers/response'
import { globalStyle } from 'styles/globalStyle'
import dayjs from 'utils/dayjs'
import { Request_Status_Type_Enum } from 'constants/Types'
import IRecommended from 'components/IRecommended'
import { MY_FAVORITES } from 'constants/Data'
import { navigate } from 'navigation/RootNavigation'

const RedeemGift = memo(() => {
  const reduxDispatch = useDispatch()
  const { bottom } = useLayout()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'request', 'common'])
  const route = useRoute()
  const { carnivalGift }: any = route.params
  const opacity = useSharedValue(0.15)

  const { userProfile } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile
  }))

  opacity.value = withRepeat(
    withTiming(1, { duration: 500, easing: Easing.ease }),
    -1,
    true
  )

  const blinkStyle = useAnimatedStyle(() => ({ opacity: opacity.value }), [])

  const onRedeem = () => {
    reduxDispatch(
      createUserCarnivalGifts(carnivalGift.id, () => navigate('MainBottomTab'))
    )
    reduxDispatch(homeDisplay('carnival'))
  }

  const remainingBalance: any = () => {
    if (userProfile.wallet_balance && carnivalGift.gift.reward_amount) {
      return transpose(
        userProfile.wallet_balance,
        carnivalGift.gift.reward_amount
      )
    } else {
      return [0, 0, 0, 0]
    }
  }

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('home:redeem_gift').toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.contact}>
          <Text category='h7' mt={24} mb={8} bold status='link'>
            Petunjuk Redeem!
          </Text>
          <Text category='h8-s' mb={8}>
            Setelah "Redeem" artinya kamu telah mengamankan kado yang kamu
            inginkan, yang nantinya bisa kamu tukar di Booth Youthcamp ketika
            festival berlangsung.
          </Text>
          <Text category='h8-s'>
            Kado yang telah di "Redeem" bisa dibatalkan kapan saja dan MONSTA
            kamu akan balik kembali sesuai harga kado tersebut.
          </Text>
          <Text category='h6' bold mt={32}>
            {carnivalGift.gift.name}
          </Text>
          <Flex itemsCenter justify='space-between' mt={16} mr={16}>
            <Text category='h7' status='info'>
              MONSTA saat ini
            </Text>
            <Flex style={styles.tokens} justify='center' itemsCenter center>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenBeryl]}
                  itemsCenter
                >
                  <Text category='h6' bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[0]
                      : '-'}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex style={[styles.tokenAmount, styles.tokenAle]} itemsCenter>
                  <Text category='h6' bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[1]
                      : '-'}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenJenny]}
                  itemsCenter
                >
                  <Text category='h6' bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[2]
                      : '-'}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenMamo]}
                  itemsCenter
                >
                  <Text category='h6' bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[3]
                      : '-'}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex itemsCenter justify='space-between' mt={8} mr={16}>
            <Text category='h7' status='danger'>
              Harga Kado
            </Text>
            <Flex style={styles.tokens} justify='center' itemsCenter center>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenBeryl]}
                  itemsCenter
                >
                  <Text category='h6' bold style={styles.tokenText}>
                    {carnivalGift.gift.reward_amount[0]}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex style={[styles.tokenAmount, styles.tokenAle]} itemsCenter>
                  <Text category='h6' bold style={styles.tokenText}>
                    {carnivalGift.gift.reward_amount[1]}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenJenny]}
                  itemsCenter
                >
                  <Text category='h6' bold style={styles.tokenText}>
                    {carnivalGift.gift.reward_amount[2]}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenMamo]}
                  itemsCenter
                >
                  <Text category='h6' bold style={styles.tokenText}>
                    {carnivalGift.gift.reward_amount[3]}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex style={styles.deductLine} justify='flex-end'>
            <Text bold category='h6' status='danger' mr={-8}>
              —
            </Text>
          </Flex>
          <Animated.View style={blinkStyle}>
            <Flex itemsCenter justify='space-between' mt={16} mr={16}>
              <Text category='h7'>Sisa MONSTA</Text>
              <Flex style={styles.tokens} justify='center' itemsCenter center>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenBeryl]}
                    itemsCenter
                  >
                    <Text category='h6' bold style={styles.tokenText}>
                      {remainingBalance()[0]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenAle]}
                    itemsCenter
                  >
                    <Text category='h6' bold style={styles.tokenText}>
                      {remainingBalance()[1]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenJenny]}
                    itemsCenter
                  >
                    <Text category='h6' bold style={styles.tokenText}>
                      {remainingBalance()[2]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenMamo]}
                    itemsCenter
                  >
                    <Text category='h6' bold style={styles.tokenText}>
                      {remainingBalance()[3]}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Animated.View>
        </View>
      </Content>
      <Flex
        level='2'
        style={styles.bottom}
        padder
        pb={bottom + 8}
        itemsCenter
        justify='center'
      >
        {every(remainingBalance(), value => value >= 0) ? (
          <Button
            children={'Redeem'}
            style={globalStyle.flexOne}
            status='gift'
            onPress={onRedeem}
            // accessoryLeft={<LoadingIndicator status='control' />}
          />
        ) : (
          <Text category='h5' bold status='danger'>
            MONSTA tidak cukup
          </Text>
        )}
      </Flex>
    </Container>
  )
})

export default RedeemGift

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0
  },
  content: {
    paddingBottom: 140
  },
  personal: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 40
  },
  cancelInterview: {
    alignSelf: 'center',
    marginBottom: 40
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
    alignSelf: 'center'
  },
  contact: {
    marginBottom: 40
  },
  iconCalendar: {
    ...globalStyle.icon16,
    tintColor: 'text-placeholder-color',
    marginRight: 8
  },
  details: {
    marginVertical: 40
  },
  additional: {
    marginBottom: 40
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.shadowFade,
    paddingTop: 14
  },
  deductLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'color-basic-700',
    marginTop: -8
  },
  tokens: {},
  token: {},
  tokenMamo: {
    backgroundColor: 'color-mamo',
    paddingHorizontal: 6,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16
  },
  tokenAle: {
    backgroundColor: 'color-ale',
    paddingHorizontal: 6
  },
  tokenBeryl: {
    backgroundColor: 'color-beryl',
    paddingHorizontal: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  tokenJenny: {
    backgroundColor: 'color-jenny',
    paddingHorizontal: 6
  },
  tokenAmount: {
    width: 30,
    height: 30,
    ...globalStyle.center
  },
  tokenText: {
    color: '#FFF'
  }
})
