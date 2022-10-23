import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { View, ImageBackground, StyleProp, ImageStyle } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Avatar
} from '@ui-kitten/components'
import { isEmpty } from 'lodash'

import { Images } from 'assets/images'
import ReadMore from 'components/ReadMore'
import Text from 'components/Text'
import MonstaText from 'components/MonstaText'
import Flex from 'components/Flex'
import { RootStackParamList } from 'navigation/types'
import { getStageCamp } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'

interface CampItemProps {
  calendar?: any
  stageCamp?: any
  activeCamp?: any
  currentStage?: number
}

const CampItem = memo(
  ({ calendar, stageCamp, activeCamp, currentStage = 0 }: CampItemProps) => {
    const reduxDispatch = useDispatch()
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

    const styles = useStyleSheet(themedStyles)
    const { t } = useTranslation(['more', 'common'])

    const { camp } = stageCamp
    const { speaker } = camp

    const _onJoin = () => {
      reduxDispatch(getStageCamp(stageCamp))
      navigate('CampSchedule')
    }

    return (
      <View>
        <Layout
          style={[styles.container, { paddingBottom: calendar ? 24 : 0 }]}
          level='2'
        >
          <ImageBackground
            source={Images.cardHeader}
            style={styles.headerImage}
            resizeMode='cover'
          >
            <Text category='h2' bold style={styles.cardTitle}>
              {camp?.title}
            </Text>
          </ImageBackground>
          {calendar ? (
            <View style={styles.calendarView}>{calendar}</View>
          ) : (
            <React.Fragment>
              <Flex justify='flex-start' itemsCenter mb={16} mh={16} mt={16}>
                {speaker?.user_profile.image && (
                  <Avatar
                    style={styles.avatar as StyleProp<ImageStyle>}
                    source={{ uri: speaker?.user_profile.image }}
                    size='small'
                    shape='round'
                  />
                )}
                <Flex vertical>
                  <Text category='h7' bold>
                    {speaker?.user_profile.full_name}
                  </Text>
                </Flex>
              </Flex>
              <Flex mb={8} mh={16}>
                {camp?.description.length > 250 ? (
                  <ReadMore text={camp?.description} maxCount={250} />
                ) : (
                  <Text category='h8-s'>{camp?.description}</Text>
                )}
              </Flex>
              <Flex justify='flex-start' itemsCenter mb={8} mh={16}>
                <MonstaText
                  amount={camp?.reward_amount?.join('')}
                  category='h8'
                  radius={11}
                />
              </Flex>
              <Flex
                justify='space-between'
                alignItems='flex-end'
                style={styles.cardFooter}
              >
                {isEmpty(activeCamp) && currentStage === stageCamp.stage.level && (
                  <Flex
                    style={styles.button}
                    itemsCenter
                    center
                    onPress={() => _onJoin()}
                  >
                    <Text category='h7' style={{ color: '#FFF' }}>
                      Join
                    </Text>
                  </Flex>
                )}
                {activeCamp?.stage_camp?.id === stageCamp?.id ? (
                  <Text category='h8' status='success'>
                    Sedang Diikuti
                  </Text>
                ) : (
                  activeCamp &&
                  currentStage === stageCamp.stage.level && (
                    <Text category='h8' status='warning'>
                      Sedang mengikuti pelatihan lain!
                    </Text>
                  )
                )}
                {currentStage !== stageCamp.stage.level && (
                  <Text category='h8' status='warning'>
                    Level pelatihan terlalu{' '}
                    {currentStage < stageCamp.stage.level ? 'tinggi' : 'rendah'}
                  </Text>
                )}
              </Flex>
              {/* {detail ? (
              <React.Fragment>
                <Flex justify='flex-start' itemsCenter mb={8} mh={16} mt={8}>
                  <Icon pack='assets' name='calendar' style={styles.icon} />
                  <Text category='h7' ml={8} bold>
                    25 September 2022
                  </Text>
                </Flex>
                <Flex justify='flex-start' itemsCenter mb={16} mh={16}>
                  <Icon pack='assets' name='time' style={styles.icon} />
                  <Text category='h7-s' ml={8}>
                    08.00 - 11.00
                  </Text>
                </Flex>
              </React.Fragment>
            ) : (
              <Flex
                justify='space-between'
                alignItems='flex-end'
                style={styles.cardFooter}
              >
                <Flex
                  style={styles.button}
                  itemsCenter
                  center
                  onPress={() => _onJoin()}
                >
                  <Text category='h7' style={{ color: '#FFF' }}>
                    Join
                  </Text>
                </Flex>
              </Flex>
            )} */}
            </React.Fragment>
          )}
        </Layout>
      </View>
    )
  }
)

export default CampItem

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 24,
    maxHeight: '100%'
  },
  calendarView: {
    marginBottom: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden'
  },
  headerImage: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden'
  },
  cardTitle: {
    color: 'color-basic-100',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 24,
    marginVertical: 8
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: 'text-placeholder-color',
    marginTop: 2
  },
  avatar: {
    backgroundColor: 'color-mamo',
    marginRight: 8
  },
  button: {
    backgroundColor: 'color-primary-100',
    paddingHorizontal: 32,
    paddingVertical: 4,
    borderRadius: 50
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'color-carnival',
    backgroundColor: 'color-basic-200',
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  }
})
