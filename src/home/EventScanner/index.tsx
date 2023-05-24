import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TopNavigation } from '@ui-kitten/components'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useTranslation } from 'react-i18next'
import Constants from 'expo-constants'
import {
  useRoute,
  useNavigation,
  NavigationProp,
  CommonActions
} from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'

import { updateUserEvents } from 'store/actions'
import { Images } from 'assets/images'
import LottieAnimation from 'components/LottieAnimation'
import NavigationAction from 'components/NavigationAction'
import { RootStackParamList } from 'navigation/types'

const EventScanner = () => {
  const reduxDispatch = useDispatch()
  const { navigate, goBack, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute()
  const { userEvent }: any = route.params
  const { t } = useTranslation(['auth', 'common', 'success'])
  const [hasPermission, setHasPermission] = useState<any>(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleUsed = React.useCallback(() => {
    navigate('SuccessScr', {
      successScr: {
        title: t('success:title'),
        description: t('success:ticket_used'),
        actions: [
          {
            title: t('success:home_button'),
            onPress: () =>
              dispatch(
                CommonActions.reset({
                  routes: [{ name: 'MainBottomTab' }]
                })
              ),
            status: 'basic'
          }
        ],
        buttonsViewStyle: { alignSelf: 'center' }
      }
    })
  }, [])

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true)
    if (data === userEvent?.event_id) {
      reduxDispatch(
        updateUserEvents(
          {
            id: userEvent?.id,
            status: 'used'
          },
          () => handleUsed()
        )
      )
    } else {
      Toast.show({
        type: 'error',
        text1: 'Permintaan Gagal',
        text2: 'QR Code tidak sesuai!'
      })
      goBack()
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <LottieAnimation
          source={Images.qrScanner}
          autoPlay
          loop
          resizeMode='contain'
        />
      </BarCodeScanner>
      <TopNavigation accessoryLeft={<NavigationAction />} />
    </View>
  )
}

export default EventScanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  }
})
