import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { View, ImageBackground, Text as TextNative } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { StyleService, useStyleSheet, Layout } from '@ui-kitten/components'
import { isEmpty, find } from 'lodash'
import Image from 'react-native-scalable-image'

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
  currentStage?: number
}

const CampItem = memo(
  ({ calendar, stageCamp, currentStage = 0 }: CampItemProps) => {
    const reduxDispatch = useDispatch()
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
    const styles = useStyleSheet(themedStyles)
    const { t } = useTranslation(['more', 'common'])

    const { camp } = stageCamp
    const { speaker } = camp

    const { carnival } = useSelector((state: any) => ({
      carnival: state.Carnival.carnival
    }))

    const finishedCamp = find(carnival.finished_camps, { id: camp?.id })
    const activatedCamp = find(carnival.active_camps, {
      stage_camp: {
        camp: {
          id: camp?.id
        }
      }
    })

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
            source={Images.pageBackground}
            style={styles.headerImage}
            resizeMode='cover'
          >
            <TextNative style={styles.cardTitle}>{camp?.title}</TextNative>
          </ImageBackground>
          {calendar ? (
            <View style={styles.calendarView}>{calendar}</View>
          ) : (
            <React.Fragment>
              <Flex
                justify='flex-start'
                alignItems='flex-start'
                mb={16}
                mh={16}
                mt={16}
              >
                {speaker?.user_profile.image && (
                  <Flex mr={16} style={styles.avatar}>
                    <Image
                      source={{ uri: speaker?.user_profile.image }}
                      width={120}
                    />
                  </Flex>
                )}
                <Flex
                  vertical
                  justify='flex-start'
                  alignItems='flex-start'
                  style={{ flex: 1 }}
                >
                  <Text category='h8' bold mb={4}>
                    {speaker?.user_profile.full_name}
                  </Text>
                  <Flex mb={8}>
                    <MonstaText
                      amount={camp?.reward_amount?.join('')}
                      category='h8'
                      radius={11}
                    />
                  </Flex>
                  {camp?.description.length > 250 ? (
                    <ReadMore text={camp?.description} maxCount={250} />
                  ) : (
                    <Text category='h8-s'>{camp?.description}</Text>
                  )}
                </Flex>
              </Flex>
              <Flex
                justify='space-between'
                alignItems='flex-end'
                style={styles.cardFooter}
              >
                {isEmpty(activatedCamp) && isEmpty(finishedCamp) && (
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
                {!isEmpty(activatedCamp) && (
                  <Text category='h8' status='success'>
                    Sedang Diikuti
                  </Text>
                )}
                {!isEmpty(finishedCamp) && (
                  <Text category='h8' status='warning'>
                    Sudah pernah mengikuti pelatihan ini
                  </Text>
                )}
              </Flex>
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
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 24,
    fontWeight: '800',
    paddingHorizontal: 16,
    marginVertical: 8
  },
  avatar: {
    borderRadius: 8,
    overflow: 'hidden',
    ...globalStyle.shadowFade
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
