import React, { memo } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout
} from '@ui-kitten/components'

import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import Text from 'components/Text'

import CampItem from '../Components/CampItem'
import Calendar from '../../find/Calendar/Calendar'

const CampList = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const { stageCamp, stage } = useSelector((state: any) => ({
    stageCamp: state.StageCamp.stageCamp,
    stage: state.Stage.stage
  }))

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('home:camp_schedule').toString()}
        subtitle={`${stage?.name} - Level ${stage?.level}`}
        accessoryLeft={<NavigationAction />}
      />
      <View style={styles.calendarView}>
        <Layout style={styles.content} level='1'>
          {stageCamp.stage_camp_schedules?.length > 0 ? (
            <CampItem
              calendar={<Calendar schedules={stageCamp.stage_camp_schedules} />}
              stageCamp={stageCamp}
            />
          ) : (
            <Text>Tidak ada jadwal saat ini</Text>
          )}
        </Layout>
      </View>
    </Container>
  )
})

export default CampList

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 24
  },
  calendarView: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24
  }
})
