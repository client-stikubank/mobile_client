import React, { memo } from 'react'
import { TouchableOpacity, View, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import * as Linking from 'expo-linking'
import {
  Avatar,
  Button,
  Icon,
  Layout,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

import { confirmActiveCamp, claimActiveCamp } from 'api/carnival'
import { Images } from 'assets/images'
import Text from 'components/Text'
import MonstaText from 'components/MonstaText'
import Flex from 'components/Flex'
import ButtonFill from 'components/ButtonFill'
import useLayout from 'hooks/useLayout'
import { getCarnival, getUserStageSchedules, toggleScreen } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'
import { RootStackParamList } from 'navigation/types'

const ActiveCamp = memo(({ campItem }: any) => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { width } = useLayout()
  const { t } = useTranslation(['home', 'common'])

  const { carnival } = useSelector((state: any) => ({
    carnival: state.Carnival.carnival
  }))

  const active_camp = campItem ? campItem : carnival?.active_camp
  const { stage_camp, stage_camp_schedule } = active_camp
  const { camp, stage } = stage_camp

  const campStatus = () => {
    switch (stage_camp_schedule.status) {
      case 'claim_time':
        return {
          class: 'success',
          text:
            active_camp.status === 'confirmed'
              ? 'KLAIM HADIAH'
              : 'SUDAH DI KLAIM'
        }
      case 'reminded':
        return {
          class: 'info',
          text:
            active_camp.status === 'pending' ? 'KONFIRMASI KEHADIRAN' : 'HADIR'
        }
      case 'completed':
        return {
          class: ['absent', 'rejected'].includes(active_camp.status)
            ? 'danger'
            : 'success',
          text:
            (active_camp.status === 'absent' && 'TIDAK HADIR') ||
            (active_camp.status === 'rejected' && 'DIBATALKAN') ||
            (active_camp.status === 'finish' && 'SELESAI')
        }
      case 'pending':
      default:
        return { class: 'warning', text: 'AKAN DATANG' }
    }
  }

  const attendaceConfirmation = async () => {
    Alert.alert('Konfirmasi Kehadiran', '', [
      {
        text: 'Tidak',
        onPress: () => console.log('Cancel Pressed')
      },
      { text: 'Ya', onPress: () => confirm() }
    ])
  }

  const confirm = async () => {
    if (stage_camp_schedule?.learning_type === 'offline') {
      navigate('AttendanceScanner', {
        stageCampSchedule: stage_camp_schedule,
        isClaim: false,
        onSuccess: async () => {
          reduxDispatch(toggleScreen(true))
          const res = await confirmActiveCamp()
          if (res) {
            reduxDispatch(getUserStageSchedules())
            reduxDispatch(getCarnival())
          }
        }
      })
    } else {
      reduxDispatch(toggleScreen(true))
      const res = await confirmActiveCamp()
      if (res) {
        reduxDispatch(getUserStageSchedules())
        reduxDispatch(getCarnival())
      }
    }
  }

  const claim = async () => {
    if (stage_camp_schedule?.learning_type === 'offline') {
      navigate('AttendanceScanner', {
        stageCampSchedule: stage_camp_schedule,
        isClaim: true,
        onSuccess: async () => {
          reduxDispatch(toggleScreen(true))
          const res = await claimActiveCamp()
          if (res) {
            reduxDispatch(getUserStageSchedules())
            reduxDispatch(getCarnival())
          }
        }
      })
    } else {
      reduxDispatch(toggleScreen(true))
      const res = await claimActiveCamp()
      if (res) {
        reduxDispatch(getUserStageSchedules())
        reduxDispatch(getCarnival())
      }
    }
  }

  console.tron.log('CARNA', stage_camp_schedule)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={onPress}
          style={{ width: width - 48 }}
        >
          <Layout level={'2'} style={[styles.content, globalStyle.shadow]}>
            <View>
              <Text category='h8' bold status={campStatus().class}>
                {campStatus().text}
              </Text>
              <Text category='h7' mt={8} bold>
                {stage?.name} - Level {stage?.level}
              </Text>
              <Text category='h8-s' bold>
                {camp?.title}
              </Text>
              <Flex mt={8} vertical>
                <Flex justify='flex-start'>
                  <Icon pack='assets' name='calendar' style={styles.icon} />
                  <Text category='h8-s'>
                    {dayjs(stage_camp_schedule?.started_at)
                      .locale('id')
                      .format('dddd, DD MMMM YYYY')}
                  </Text>
                </Flex>
                <Flex justify='flex-start'>
                  <Icon pack='assets' name='time' style={styles.icon} />
                  <Text category='h8-s'>
                    {`${stage_camp_schedule?.time_start} - ${stage_camp_schedule?.time_end}`}
                  </Text>
                </Flex>
                <Flex justify='flex-start' mt={8}>
                  <MonstaText
                    amount={camp?.reward_amount?.join('')}
                    category='h8'
                    radius={11}
                  />
                </Flex>
                {stage_camp_schedule?.learning_type === 'online' &&
                  stage_camp_schedule?.status === 'reminded' &&
                  active_camp.status === 'confirmed' && (
                    <Button
                      status='outline'
                      size='small'
                      style={styles.buttonAction}
                      onPress={() => Linking.openURL(stage_camp_schedule?.link)}
                    >
                      Link Meeting
                    </Button>
                  )}
                {stage_camp_schedule?.status === 'reminded' &&
                  active_camp.status === 'pending' && (
                    <Button
                      size='small'
                      style={styles.buttonAction}
                      onPress={attendaceConfirmation}
                    >
                      Konfirmasi Kehadiran
                    </Button>
                  )}

                {stage_camp_schedule.status === 'claim_time' &&
                  active_camp.status === 'confirmed' && (
                    <Button
                      size='small'
                      style={styles.buttonAction}
                      onPress={claim}
                    >
                      Klaim Monsta
                    </Button>
                  )}
              </Flex>
            </View>
            <Avatar
              source={
                camp?.speaker?.user_profile.image
                  ? { uri: camp?.speaker?.user_profile.image }
                  : Images.tokenMamo
              }
              size='large'
              shape='rounded'
              /* @ts-ignore */
              style={styles.avatar}
            />
            <ButtonFill
              icon='videoOn'
              status='twitter'
              size='small'
              style={styles.zoomIcon}
            />
          </Layout>
        </TouchableOpacity>
      </View>
    </View>
  )
})

export default ActiveCamp

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dot: {
    width: 3,
    height: 3,
    marginHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: 'text-placeholder-color'
  },
  content: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: 'color-basic-400'
  },
  zoomIcon: {
    position: 'absolute',
    top: 72,
    right: 8
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: 'color-basic-600',
    marginRight: 3
  },
  buttonAction: {
    marginTop: 16
  }
})
