import React, { memo } from 'react'
import { View } from 'react-native'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout
} from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'

import Content from 'components/Content'
import Container from 'components/Container'
import Calendar from '../../find/Calendar/Calendar'
import NavigationAction from 'components/NavigationAction'
import CampItem from '../Components/CampItem'

const CampList = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('home:camp_schedule').toString()}
        accessoryLeft={<NavigationAction />}
      />
      <View style={styles.calendarView}>
        <Layout style={styles.content} level='1'>
          <CampItem calendar={<Calendar />} />
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
