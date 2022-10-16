import React, { memo, useCallback, useEffect, useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { Images } from 'assets/images'
import Content from 'components/Content'
import Container from 'components/Container'
import Text from 'components/Text'
import TitleField from 'components/TitleField'
import IRecommended from 'components/IRecommended'
import Flex from 'components/Flex'
import { MY_FAVORITES, MY_RECOMMENDED } from 'constants/Data'
import {
  HomeStackParamList,
  MainBottomTabStackParamList,
  RootStackParamList
} from 'navigation/types'
import { getCarnival } from 'store/actions'

import CreateJobPost from './Components/CreateJobPost'
import ActiveCamp from './Components/ActiveCamp'
import IFavorites from './Components/IFavorites'
import MyRecommend from './Components/MyRecommend'
import HeaderHome from './Components/HeaderHome'
import Carnival from './Components/Carnival'
import Profile from './Components/Profile'
import CampDetail from './CampDetail'

const HomeSrc = memo(() => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])

  const [isFirstTime, setFirst] = useState(true)

  const { displayHome } = useSelector((state: any) => ({
    displayHome: state.Display.home
  }))

  useEffect(() => {
    if (displayHome == 'carnival') {
      reduxDispatch(getCarnival())
    }
  }, [displayHome])

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <HeaderHome />
        {displayHome == 'carnival' && <Carnival />}
        {displayHome == 'profile' && <Profile />}
        {displayHome == 'campDetail' && <CampDetail />}
        {/* <View style={styles.topContent}>
          {isFirstTime ? (
            <>
              <CreateJobPost />
            </>
          ) : (
            <>
              <ActiveCamp />
            </>
          )}
        </View>
        <TitleField
          title={t('home:my_favorites')}
          onPress={() => {
            navigate('MyFavorites')
          }}
        />
        <Content
          horizontal
          contentContainerStyle={styles.myFavorites}
          scrollEventThrottle={16}
        >
          {MY_FAVORITES.map((item, i) => {
            return <IFavorites item={item} key={i} />
          })}
        </Content>
        <MyRecommend data={MY_RECOMMENDED} /> */}
      </Content>
    </Container>
  )
})

export default HomeSrc

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: 'color-carnival'
  },
  myFavorites: {
    paddingHorizontal: 24
  },
  content: {
    marginBottom: 40
  },
  topContent: {
    marginBottom: 48,
    marginTop: 40
  }
})
