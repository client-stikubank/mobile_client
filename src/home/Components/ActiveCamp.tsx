import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Icon,
  Layout,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

import { Images } from 'assets/images'
import Text from 'components/Text'
import Flex from 'components/Flex'
import ButtonFill from 'components/ButtonFill'
import useLayout from 'hooks/useLayout'

const ActiveCamp = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { width } = useLayout()
  const { t } = useTranslation(['home', 'common'])

  const { carnival } = useSelector((state: any) => ({
    carnival: state.Carnival.carnival
  }))

  const { active_camp } = carnival
  const { stage_camp, stage_camp_schedule } = active_camp
  const { camp, stage } = stage_camp

  const campStatus = () => {
    switch (active_camp.status) {
      case 'running':
        return { class: 'info', text: 'SEDANG BERLANGSUNG' }
      case 'finish':
        return { class: 'success', text: 'SUDAH SELESAI' }
      case 'pending':
      default:
        return { class: 'warning', text: 'TERDAFTAR' }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.54}
          // onPress={onPress}
          style={{ width: width - 48 }}
        >
          <Layout level={'2'} style={styles.content}>
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
    flex: 1,
    marginTop: 16
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24
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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: 'color-basic-400'
  },
  zoomIcon: {
    position: 'absolute',
    bottom: 16,
    right: 8
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: 'color-basic-600',
    marginRight: 3
  }
})
