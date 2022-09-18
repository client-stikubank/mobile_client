import React, { memo } from 'react'
import {
  View,
  ImageRequireSource,
  ImageBackground,
  Image,
  StyleProp,
  ImageStyle
} from 'react-native'
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar
} from '@ui-kitten/components'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import Text from 'components/Text'
import Flex from 'components/Flex'
import NavigationAction from 'components/NavigationAction'
import { RootStackParamList } from 'navigation/types'
import { globalStyle } from 'styles/globalStyle'
import { useTranslation } from 'react-i18next'

import { Images } from 'assets/images'

interface HeaderHomeProps {
  name: string
  avatar: ImageRequireSource
  email: string
  notification?: number
}

const HeaderHome = memo(
  ({ email, avatar, name, notification }: HeaderHomeProps) => {
    const theme = useTheme()
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
    const styles = useStyleSheet(themedStyles)
    const _onInviteAndWin = () => navigate('InviteAndWin')
    const { t } = useTranslation(['home', 'common'])
    return (
      <Flex itemsCenter style={styles.container}>
        <ImageBackground
          source={Images.headerBg}
          style={styles.imageBackground}
          resizeMode='cover'
        >
          <Flex
            style={styles.navigationButton}
            vertical={false}
            justify='center'
          >
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

            <Flex mh={12} onPress={_onInviteAndWin} style={styles.button}>
              <Image
                source={Images.buttonQr}
                style={styles.buttonImage as StyleProp<ImageStyle>}
              />
            </Flex>

            <Flex mh={12} onPress={_onInviteAndWin} style={styles.button}>
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
              <Flex style={styles.tokenBeryl}>
                <Image
                  source={Images.tokenBeryl}
                  style={styles.tokenImage as StyleProp<ImageStyle>}
                />
              </Flex>
              <Flex style={[styles.tokenAmount, styles.tokenMamo]} itemsCenter>
                <Text category='h6' bold style={styles.tokenText}>
                  2
                </Text>
              </Flex>
            </Flex>
            <Flex style={styles.token} vertical={true}>
              <Flex style={styles.tokenAle}>
                <Image
                  source={Images.tokenAle}
                  style={styles.tokenImage as StyleProp<ImageStyle>}
                />
              </Flex>
              <Flex style={[styles.tokenAmount, styles.tokenJenny]} itemsCenter>
                <Text category='h6' bold style={styles.tokenText}>
                  2
                </Text>
              </Flex>
            </Flex>
            <Flex style={styles.token} vertical={true}>
              <Flex style={styles.tokenJenny}>
                <Image
                  source={Images.tokenJenny}
                  style={styles.tokenImage as StyleProp<ImageStyle>}
                />
              </Flex>
              <Flex style={[styles.tokenAmount, styles.tokenAle]} itemsCenter>
                <Text category='h6' bold style={styles.tokenText}>
                  2
                </Text>
              </Flex>
            </Flex>
            <Flex style={styles.token} vertical={true}>
              <Flex style={styles.tokenMamo}>
                <Image
                  source={Images.tokenMamo}
                  style={styles.tokenImage as StyleProp<ImageStyle>}
                />
              </Flex>
              <Flex style={[styles.tokenAmount, styles.tokenBeryl]} itemsCenter>
                <Text category='h6' bold style={styles.tokenText}>
                  2
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </ImageBackground>
      </Flex>
    )
  }
)

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
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'color-basic-600',
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
