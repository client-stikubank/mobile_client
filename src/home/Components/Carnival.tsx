import React, { memo } from 'react'
import { View, Platform } from 'react-native'
import { useTheme, StyleService, useStyleSheet } from '@ui-kitten/components'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import Image from 'react-native-scalable-image'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'

import Text from 'components/Text'
import Flex from 'components/Flex'
import MonstaText from 'components/MonstaText'
import NavigationAction from 'components/NavigationAction'
import { RootStackParamList } from 'navigation/types'
import { globalStyle } from 'styles/globalStyle'
import useLayout from 'hooks/useLayout'
import { Images } from 'assets/images'

interface CarnivalProps {
  currentStage: number
}

const Carnival = memo(({ currentStage }: CarnivalProps) => {
  const theme = useTheme()
  const { width } = useLayout()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const _onCampList = () => navigate('CampList')
  const { t } = useTranslation(['home', 'common'])

  return (
    <View style={styles.carnivalContainer}>
      <Image source={Images.carnivalTemplate} width={width} />
      <Flex onPress={() => {}} style={styles.startMapping}>
        <Text category='h5' uppercase bold style={styles.startText}>
          Start
        </Text>
      </Flex>
      {[1, 2, 3, 4, 5, 6].map(index => (
        <Flex
          key={index}
          onPress={() => _onCampList()}
          // @ts-ignore
          style={[styles.itemMapping, styles[`stage${index}`]]}
          vertical={true}
          itemsCenter
        >
          <Image source={Images.iconStage} width={50} />
          <Flex style={styles.activeStage}>
            <Image source={Images.iconActiveStage} width={18} />
          </Flex>
          <Text category='h9-s' mt={4}>
            Level {index}
          </Text>
          <Text category='h9' bold>
            Engagement
          </Text>
          <MonstaText amount='1126' />
        </Flex>
      ))}
      <Flex onPress={() => {}} style={styles.finishMapping}>
        <Text category='h5' uppercase bold style={styles.startText}>
          Finish
        </Text>
      </Flex>
    </View>
  )
})

export default Carnival

const themedStyles = StyleService.create({
  carnivalContainer: {},
  startMapping: {
    width: '20%',
    height: '7.5%',
    backgroundColor: 'color-primary-200',
    position: 'absolute',
    right: '16.7%',
    top: '3.45%',
    borderRadius: 100,
    ...globalStyle.center
  },
  finishMapping: {
    width: '20%',
    height: '7.5%',
    backgroundColor: 'color-primary-200',
    position: 'absolute',
    left: '3.9%',
    bottom: '25.4%',
    borderRadius: 100,
    ...globalStyle.center
  },
  startText: {
    color: 'color-basic-100'
  },
  itemMapping: {
    position: 'absolute',
    transform: [
      {
        scale: Platform.OS === 'ios' ? 1 : 0.95
      }
    ]
  },
  stage1: {
    right: '34.5%',
    top: '11%'
  },
  stage2: {
    right: '56.5%',
    top: '22.5%'
  },
  stage3: {
    right: '21%',
    top: '30.5%'
  },
  stage4: {
    left: '5%',
    top: '39%'
  },
  stage5: {
    right: '39.5%',
    top: '48.5%'
  },
  stage6: {
    right: '42%',
    top: '60%'
  },
  activeStage: {
    position: 'absolute',
    top: 20,
    left: -8
  }
})
