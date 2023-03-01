import React, { memo } from 'react'
import { View, Platform, RefreshControl } from 'react-native'
import Image from 'react-native-scalable-image'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useTheme, StyleService, useStyleSheet } from '@ui-kitten/components'
import { isEmpty } from 'lodash'

import { getStage, getAssessments } from 'store/actions'
import useLayout from 'hooks/useLayout'
import { Images } from 'assets/images'
import Text from 'components/Text'
import Flex from 'components/Flex'
import Content from 'components/Content'

import MonstaText from 'components/MonstaText'
import { RootStackParamList } from 'navigation/types'
import { globalStyle } from 'styles/globalStyle'

import ActiveCamp from './ActiveCamp'
import GiftList from './GiftList'

const Carnival = memo(() => {
  const reduxDispatch = useDispatch()
  const theme = useTheme()
  const { width } = useLayout()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const { carnival, assessments } = useSelector((state: any) => ({
    carnival: state.Carnival.carnival,
    assessments: state.Assessment.assessments
  }))

  const _onAssessment = () =>
    reduxDispatch(getAssessments(() => navigate('Assessment')))

  const _onCampList = (stage: object) => {
    reduxDispatch(getStage(stage, () => navigate('CampList')))
  }

  return isEmpty(carnival) ? null : (
    <Content>
      {!isEmpty(carnival?.active_camps) && (
        <View style={styles.activeCamp}>
          {carnival?.active_camps.map((activeCamp: any) => (
            <ActiveCamp campItem={activeCamp} key={activeCamp.id} />
          ))}
        </View>
      )}
      <View style={styles.carnivalContainer}>
        <Image source={Images.carnivalTemplate} width={width} />
        <Flex onPress={_onAssessment} style={styles.startMapping}>
          <Text category='h5' uppercase bold style={styles.startText}>
            Start
          </Text>
        </Flex>
        {carnival.carnival?.stages.map((stage: any, index: bigint) => (
          <Flex
            key={stage.id}
            onPress={() => _onCampList(stage)}
            // @ts-ignore
            style={[styles.itemMapping, styles[`stage${index + 1}`]]}
            vertical={true}
            itemsCenter
          >
            <Image source={Images.iconStage} width={50} />
            <Flex style={styles.activeStage}>
              <Image source={Images.iconActiveStage} width={18} />
            </Flex>
            <Text category='h9-s' mt={4}>
              Level {stage.level}
            </Text>
            <Text category='h9' bold>
              {stage.name}
            </Text>
            <MonstaText amount={stage.high_amount || '----'} />
          </Flex>
        ))}
        <Flex onPress={() => {}} style={styles.finishMapping}>
          <Text category='h5' uppercase bold style={styles.startText}>
            Finish
          </Text>
        </Flex>
      </View>
      <GiftList />
    </Content>
  )
})

export default Carnival

const themedStyles = StyleService.create({
  carnivalContainer: {},
  activeCamp: {
    marginTop: 16,
    marginHorizontal: 24,
    paddingBottom: 30
  },
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
