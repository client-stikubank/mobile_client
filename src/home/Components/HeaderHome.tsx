import React from 'react'
import { ImageBackground, Image, StyleProp, ImageStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useTheme, StyleService, useStyleSheet } from '@ui-kitten/components'
import { isEmpty } from 'lodash'

import { homeDisplay } from 'store/actions'
import { Images } from 'assets/images'
import Text from 'components/Text'
import Flex from 'components/Flex'
import { RootStackParamList } from 'navigation/types'
import { globalStyle } from 'styles/globalStyle'

const HeaderHome = () => {
  const reduxDispatch = useDispatch()
  const theme = useTheme()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const { userProfile } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile
  }))

  const _onInviteAndWin = () => navigate('InviteAndWin')

  const changeDisplay = (display: string) => {
    reduxDispatch(homeDisplay(display))
  }

  return (
    <Flex itemsCenter style={styles.container}>
      <ImageBackground
        source={Images.headerBg}
        style={styles.imageBackground}
        resizeMode='cover'
      >
        <Flex style={styles.navigationButton} vertical={false} justify='center'>
          <Flex mh={12} onPress={_onInviteAndWin} style={styles.button}>
            <Image
              source={Images.buttonInvite}
              style={styles.buttonImage as StyleProp<ImageStyle>}
            />
          </Flex>

          <Flex mh={12} onPress={_onInviteAndWin} style={styles.button}>
            <Image
              source={Images.buttonRanking}
              style={styles.buttonImage as StyleProp<ImageStyle>}
            />
          </Flex>

          <Flex
            mh={12}
            onPress={() => changeDisplay('carnival')}
            style={styles.button}
          >
            <Image
              source={Images.buttonQr}
              style={styles.buttonImage as StyleProp<ImageStyle>}
            />
          </Flex>

          <Flex
            mh={12}
            onPress={() => changeDisplay('profile')}
            style={styles.button}
          >
            <Image
              source={Images.buttonProfile}
              style={styles.buttonImage as StyleProp<ImageStyle>}
            />
          </Flex>
        </Flex>

        <Flex
          style={styles.tokens}
          vertical={false}
          justify='center'
          itemsCenter
          center
        >
          <Flex style={styles.token} vertical={true}>
            <Flex style={styles.tokenJenny}>
              <Image
                source={Images.tokenBeryl}
                style={styles.tokenImage as StyleProp<ImageStyle>}
              />
            </Flex>
            <Flex style={[styles.tokenAmount, styles.tokenBeryl]} itemsCenter>
              <Text category='h6' bold style={styles.tokenText}>
                {!isEmpty(userProfile) ? userProfile.wallet_balance[0] : '-'}
              </Text>
            </Flex>
          </Flex>
          <Flex style={styles.token} vertical={true}>
            <Flex style={styles.tokenBeryl}>
              <Image
                source={Images.tokenAle}
                style={styles.tokenImage as StyleProp<ImageStyle>}
              />
            </Flex>
            <Flex style={[styles.tokenAmount, styles.tokenAle]} itemsCenter>
              <Text category='h6' bold style={styles.tokenText}>
                {!isEmpty(userProfile) ? userProfile.wallet_balance[1] : '-'}
              </Text>
            </Flex>
          </Flex>
          <Flex style={styles.token} vertical={true}>
            <Flex style={styles.tokenMamo}>
              <Image
                source={Images.tokenJenny}
                style={styles.tokenImage as StyleProp<ImageStyle>}
              />
            </Flex>
            <Flex style={[styles.tokenAmount, styles.tokenJenny]} itemsCenter>
              <Text category='h6' bold style={styles.tokenText}>
                {!isEmpty(userProfile) ? userProfile.wallet_balance[2] : '-'}
              </Text>
            </Flex>
          </Flex>
          <Flex style={styles.token} vertical={true}>
            <Flex style={styles.tokenAle}>
              <Image
                source={Images.tokenMamo}
                style={styles.tokenImage as StyleProp<ImageStyle>}
              />
            </Flex>
            <Flex style={[styles.tokenAmount, styles.tokenMamo]} itemsCenter>
              <Text category='h6' bold style={styles.tokenText}>
                {!isEmpty(userProfile) ? userProfile.wallet_balance[3] : '-'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </ImageBackground>
    </Flex>
  )
}

export default HeaderHome

const themedStyles = StyleService.create({
  container: {
    paddingBottom: 40,
    backgroundColor: 'color-carnival'
  },
  navigationButton: {
    marginHorizontal: 16,
    marginTop: 40
  },
  tokens: {
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: 'color-carnival',
    marginTop: -16,
    top: 32 + 1
  },
  token: {
    backgroundColor: 'purple'
  },
  tokenImage: {
    width: 80,
    height: 80
  },
  tokenMamo: {
    backgroundColor: 'color-mamo',
    paddingHorizontal: 6
  },
  tokenAle: {
    backgroundColor: 'color-ale',
    paddingHorizontal: 6
  },
  tokenBeryl: {
    backgroundColor: 'color-beryl',
    paddingHorizontal: 6
  },
  tokenJenny: {
    backgroundColor: 'color-jenny',
    paddingHorizontal: 6
  },
  tokenAmount: {
    height: 32,
    ...globalStyle.center
  },
  tokenText: {
    color: '#FFF'
  },
  avatar: {
    marginRight: 16
  },
  notification: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: 'color-danger-100',
    justifyContent: 'center',
    right: -4,
    top: -4
  },
  button: {
    ...globalStyle.shadowFade,
    width: 64,
    height: 64,
    ...globalStyle.center,
    borderRadius: 12
  },
  buttonImage: {
    width: '100%',
    resizeMode: 'contain'
  },
  imageBackground: {
    width: '100%',
    display: 'flex'
  }
})
