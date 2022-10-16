import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout
} from '@ui-kitten/components'
import { isEmpty } from 'lodash'

import { getStage } from 'store/actions'
import Content from 'components/Content'
import Container from 'components/Container'
import Text from 'components/Text'
import NavigationAction from 'components/NavigationAction'
import CampItem from '../Components/CampItem'
import { RefreshControl } from 'react-native'

const CampList = memo(() => {
  const reduxDispatch = useDispatch()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const { stage, refresh, carnival } = useSelector((state: any) => ({
    stage: state.Stage.stage,
    refresh: state.Loading.refresh,
    carnival: state.Carnival.carnival
  }))

  const onRefresh = () => {
    if (!isEmpty(stage)) {
      reduxDispatch(getStage(stage))
    }
  }

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t('home:camp_list').toString()}
        subtitle={`${stage?.name} - Level ${stage?.level}`}
        accessoryLeft={<NavigationAction />}
      />
      <Content
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <Layout style={styles.content} level='1'>
          {stage?.stage_camps?.length > 0 ? (
            stage?.stage_camps.map((stageCamp: any) => (
              <CampItem
                key={stageCamp?.id}
                stageCamp={stageCamp}
                activeCamp={carnival?.active_camp}
              />
            ))
          ) : (
            <Text>Tidak ada pelatihan saat ini</Text>
          )}
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
