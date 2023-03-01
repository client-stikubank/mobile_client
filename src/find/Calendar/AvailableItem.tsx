import React, { memo, useCallback, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import {
  StyleService,
  useStyleSheet,
  Layout,
  Modal,
  Card,
  Button,
  Icon
} from '@ui-kitten/components'

import { homeDisplay, toggleModal } from 'store/actions'
import MonstaText from 'components/MonstaText'
import Text from 'components/Text'
import Flex from 'components/Flex'
import useLayout from 'hooks/useLayout'
import { RootStackParamList } from 'navigation/types'
import { createUserStageSchedules } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'

interface IAvailableItemProps {
  data: any
  onPress?(): void
}

interface ISchedule {
  id: string
  time_start: string
  time_end: string
  quota: any
  joined_count: number
  started_at: any
  full: boolean
}

const AvailableItem = memo(({ data, onPress }: IAvailableItemProps) => {
  const reduxDispatch = useDispatch()
  const styles = useStyleSheet(themedStyles)
  const { bottom } = useLayout()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  const { t } = useTranslation(['find', 'common'])
  const [selectedSchedule, setSelectedSchedule] = useState<
    ISchedule | undefined
  >(undefined)

  const { modal, stageCamp } = useSelector((state: any) => ({
    modal: state.Modal.modal,
    stageCamp: state.StageCamp.stageCamp
  }))

  const _toggleModal = (value: boolean) => {
    reduxDispatch(toggleModal(value))
  }

  const _onSelect = (schedule: ISchedule) => {
    setSelectedSchedule(schedule)
    _toggleModal(true)
  }

  const _onCancel = () => {
    setSelectedSchedule(undefined)
    _toggleModal(false)
  }

  const _onSubmit = () => {
    _toggleModal(false)
    reduxDispatch(
      createUserStageSchedules(selectedSchedule?.id, () =>
        navigate('MainBottomTab')
      )
    )
    reduxDispatch(homeDisplay('carnival'))
    navigate('MainBottomTab')
  }

  const isDisable = (schedule: ISchedule) => {
    let times = schedule.time_start
      .split(':')
      .map((time: any) => parseInt(time))
    let start_date = dayjs(schedule.started_at)
      .set('hour', times[0])
      .set('minute', times[1])
      .subtract(1, 'minute')

    return schedule.full || dayjs() > start_date
  }

  const Opacity = 0.54

  return (
    <Flex style={styles.container} mt={8} mb={16}>
      <View style={globalStyle.flexOne}>
        <View>
          <Flex>
            <View style={styles.date}>
              <Text category='h8-s' uppercase>
                {dayjs(data.date).locale('id').format('ddd')}
              </Text>
              <Text category='h8'>{dayjs(data.date).format('DD')}</Text>
              <Text category='h8'>
                {dayjs(data.date).locale('id').format('MMM')}
              </Text>
            </View>
            <View style={globalStyle.flexOne}>
              {data.schedules?.length > 0
                ? data.schedules.map((schedule: ISchedule) => (
                    <TouchableOpacity
                      key={schedule.id}
                      onPress={() => _onSelect(schedule)}
                      activeOpacity={Opacity}
                      disabled={isDisable(schedule)}
                    >
                      <Layout
                        level={'7'}
                        style={{
                          backgroundColor: isDisable(schedule)
                            ? '#27275570'
                            : '#96519B',
                          opacity: isDisable(schedule) ? Opacity : 1,
                          ...styles.item
                        }}
                      >
                        <Flex>
                          <View>
                            <Text
                              category='h7'
                              bold
                              status={isDisable(schedule) ? 'basic' : 'control'}
                            >
                              {t('find:users')}
                            </Text>
                            <Text
                              category='h8'
                              mb={4}
                              status={isDisable(schedule) ? 'basic' : 'control'}
                            >
                              {`${schedule.joined_count}/${schedule.quota}`}
                            </Text>
                            <Text
                              category='h7'
                              bold
                              status={isDisable(schedule) ? 'basic' : 'control'}
                            >
                              {t('find:available')}
                            </Text>
                            <Text
                              category='h8'
                              status={isDisable(schedule) ? 'basic' : 'control'}
                            >
                              {`${schedule.time_start} - ${schedule.time_end}`}
                            </Text>
                          </View>
                        </Flex>
                      </Layout>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </Flex>
        </View>
      </View>
      {selectedSchedule && (
        <Modal
          backdropStyle={globalStyle.backdropStyle}
          onBackdropPress={_onCancel}
          visible={modal}
        >
          <Card
            header={
              <View>
                <Text category='h6'>
                  {stageCamp.stage?.name} - Level {stageCamp.stage?.level}
                </Text>
                <Text category='s1' mb={4}>
                  {stageCamp.camp?.title}
                </Text>
                <Flex justify='flex-start'>
                  <Icon pack='assets' name='calendar' style={styles.icon} />
                  <Text category='h8-s'>
                    {dayjs(data.date).locale('id').format('dddd, DD MMMM YYYY')}
                  </Text>
                </Flex>
                <Flex justify='flex-start'>
                  <Icon pack='assets' name='time' style={styles.icon} />
                  <Text category='h8-s'>
                    {`${selectedSchedule?.time_start} - ${selectedSchedule?.time_end}`}
                  </Text>
                </Flex>
              </View>
            }
            footer={
              <View>
                <Flex>
                  <Button
                    size='small'
                    status='outline'
                    style={styles.buttonModal}
                    onPress={_onCancel}
                  >
                    Nanti dulu
                  </Button>
                  <Button
                    size='small'
                    style={styles.buttonModal}
                    onPress={_onSubmit}
                  >
                    Siap, Daftar!
                  </Button>
                </Flex>
              </View>
            }
          >
            <Flex vertical alignItems='center' justify='center' mb={16}>
              <Text category='h8' mb={2}>
                Hadiah untuk kamu:
              </Text>
              <MonstaText
                amount={stageCamp.camp?.reward_amount?.join('')}
                category='h8'
                radius={11}
              />
            </Flex>
            <Text category='h8-s' center>
              Apakah kamu sudah siap mengikuti pelatihan ini?
            </Text>
          </Card>
        </Modal>
      )}
    </Flex>
  )
})

export default AvailableItem

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 24
  },
  item: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 16
  },
  date: {
    alignItems: 'center',
    marginRight: 24,
    width: 32
  },
  modal: {
    justifyContent: 'flex-end',
    flex: 1,
    height: '100%'
  },
  buttonModal: {
    marginHorizontal: 8
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: 'color-basic-600',
    marginRight: 3
  }
})
