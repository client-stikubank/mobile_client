import React, { memo, useEffect } from 'react'
import { BackHandler } from 'react-native'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout
} from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'

import Content from 'components/Content'
import Container from 'components/Container'
import HeaderHome from '../Components/HeaderHome'
import CampItem from '../Components/CampItem'
import { Images } from 'assets/images'

const CampDetail = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  return (
    <Container style={styles.container}>
      <Content>
        <HeaderHome
          name={'Edith Johnson'}
          avatar={Images.avatar2}
          email={'lehieuds@gmail.com'}
          notification={3}
        />
        <Layout style={styles.content} level='1'>
          <CampItem detail={true} />
        </Layout>
      </Content>
    </Container>
  )
})

export default CampDetail

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-carnival'
  },
  content: {
    backgroundColor: 'color-carnival',
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24
  }
})
