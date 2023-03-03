import React, { memo } from 'react'
import { TouchableOpacity, View, Alert, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
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
import Image from 'react-native-scalable-image'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

import { confirmActiveCamp, claimActiveCamp } from 'api/carnival'
import { Images } from 'assets/images'
import Text from 'components/Text'
import MonstaText from 'components/MonstaText'
import Flex from 'components/Flex'
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

  const active_camp = campItem
  const { stage_camp, stage_camp_schedule } = active_camp
  const { camp, stage } = stage_camp

  const campStatus = () => {
    switch (stage_camp_schedule.status) {
      case 'claim_time':
        return {
          class: 'success',
          text:
            (active_camp.status === 'finish' && 'BERHASIL DI KLAIM') ||
            (active_camp.status === 'confirmed' && 'KLAIM HADIAH KAMU') ||
            (active_camp.status === 'pending' && 'KONFIRMASI KEHADIRAN')
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

  const attendaceConfirmation = async (id: any) => {
    Alert.alert('Konfirmasi Kehadiran', '', [
      {
        text: 'Tidak',
        onPress: () => console.log('Cancel Pressed')
      },
      { text: 'Ya', onPress: () => confirm(id) }
    ])
  }

  const confirm = async (id: any) => {
    if (stage_camp_schedule?.learning_type === 'offline') {
      navigate('AttendanceScanner', {
        stageCampSchedule: stage_camp_schedule,
        isClaim: false,
        onSuccess: async () => {
          reduxDispatch(toggleScreen(true))
          const res = await confirmActiveCamp(id)
          if (res) {
            reduxDispatch(getUserStageSchedules())
            reduxDispatch(getCarnival())
          }
        }
      })
    } else {
      reduxDispatch(toggleScreen(true))
      const res = await confirmActiveCamp(id)
      if (res) {
        reduxDispatch(getUserStageSchedules())
        reduxDispatch(getCarnival())
      }
    }
  }

  const claim = async (id: any) => {
    if (stage_camp_schedule?.learning_type === 'offline') {
      navigate('AttendanceScanner', {
        stageCampSchedule: stage_camp_schedule,
        isClaim: true,
        onSuccess: async () => {
          reduxDispatch(toggleScreen(true))
          const res = await claimActiveCamp(id)
          if (res) {
            reduxDispatch(getUserStageSchedules())
            reduxDispatch(getCarnival())
          }
        }
      })
    } else {
      reduxDispatch(toggleScreen(true))
      const res = await claimActiveCamp(id)
      if (res) {
        reduxDispatch(getUserStageSchedules())
        reduxDispatch(getCarnival())
      }
    }
  }

  return (
    <View>
      <Layout style={styles.container} level='2'>
        <View>
          <Text category='h8' bold status={campStatus().class} mt={16} ml={16}>
            {campStatus().text}
          </Text>
          <Flex justify='flex-start' alignItems='flex-start' mh={16} mt={16}>
            <View>
              {camp?.speaker?.user_profile.image && (
                <Flex mr={16} style={styles.avatar}>
                  <Image
                    source={{ uri: camp?.speaker?.user_profile.image }}
                    width={120}
                  />
                </Flex>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text category='h7' bold>
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
              </Flex>
            </View>
          </Flex>
          <Flex vertical padder pb={16}>
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
                  onPress={() => attendaceConfirmation(active_camp?.id)}
                >
                  Konfirmasi Kehadiran
                </Button>
              )}

            {stage_camp_schedule.status === 'claim_time' &&
              active_camp.status === 'confirmed' && (
                <Button
                  size='small'
                  style={styles.buttonAction}
                  onPress={() => claim(active_camp?.id)}
                >
                  Klaim Monsta
                </Button>
              )}
          </Flex>
        </View>
      </Layout>
    </View>
  )
})

export default ActiveCamp

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    marginBottom: 24,
    maxHeight: '100%',
    ...globalStyle.shadow
  },
  content: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  avatar: {
    borderRadius: 8,
    overflow: 'hidden',
    ...globalStyle.shadowFade
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
