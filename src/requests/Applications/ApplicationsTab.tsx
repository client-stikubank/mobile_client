import React, { memo } from 'react'
import { View } from 'react-native'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { DATA_CURRENT_APPLICATION, DATA_PASS_APPLICATION } from 'constants/Data'
import ApplicationItem from './ApplicationItem'
import TitleList from '../Components/TitleList'
import { MainBottomTabStackParamList } from 'navigation/types'
import { Request_Type_Enum } from 'constants/Types'
import EmptyData from '../Components/EmptyData'
import { Images } from 'assets/images'

const ApplicationsTab = memo(() => {
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['common, request'])

  const onSeeAllPast = () => {
    navigate('Requests', {
      screen: 'RequestsInPast',
      params: { requestType: Request_Type_Enum.Application }
    })
  }
  return (
    <View style={styles.container}>
      {false ? (
        <EmptyData
          image={Images.emptyFavorites}
          title={t('request:noGift')}
          description={t('request:noGiftTitle')}
        />
      ) : (
        <React.Fragment>
          <>
            <TitleList current dataLength={DATA_CURRENT_APPLICATION.length} />
            {DATA_CURRENT_APPLICATION.map((item, i) => {
              return <ApplicationItem item={item} key={i} />
            })}
          </>
          <>
            <TitleList
              dataLength={DATA_PASS_APPLICATION.length}
              current={false}
              onSeeAll={onSeeAllPast}
            />
            {DATA_PASS_APPLICATION.map((item, i) => {
              return <ApplicationItem item={item} key={i} />
            })}
          </>
        </React.Fragment>
      )}
    </View>
  )
})

export default ApplicationsTab

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32
  }
})
