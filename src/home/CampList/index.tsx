import React, { memo } from 'react'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout
} from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'

import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import CampItem from '../Components/CampItem'

const CampList = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('home:camp_list').toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content>
        <Layout style={styles.content} level='1'>
          {[1, 2, 3, 4, 5, 6].map((item, i) => {
            return <CampItem key={i} />
          })}
        </Layout>
      </Content>
    </Container>
  )
})

export default CampList

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24
  }
})
