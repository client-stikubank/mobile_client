import React, { memo } from 'react'
import { ImageBackground, View } from 'react-native'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import Content from 'components/Content'
import Container from 'components/Container'
import Text from 'components/Text'
import HeaderHome from './Components/HeaderHome'
import Carnival from './Components/Carnival'
import { Images } from 'assets/images'
import { useTranslation } from 'react-i18next'
import {
  HomeStackParamList,
  MainBottomTabStackParamList,
  RootStackParamList
} from 'navigation/types'
import CreateJobPost from './Components/CreateJobPost'
import NextPlan from './Components/NextPlan'
import IFavorites from './Components/IFavorites'
import { MY_FAVORITES, MY_RECOMMENDED } from 'constants/Data'
import MyRecommend from './Components/MyRecommend'
import TitleField from 'components/TitleField'
import IRecommended from 'components/IRecommended'
import Flex from 'components/Flex'

const HomeSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['home', 'common'])
  const [isFirstTime, setFirst] = React.useState(true)

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <HeaderHome
          name={'Edith Johnson'}
          avatar={Images.avatar2}
          email={'lehieuds@gmail.com'}
          notification={3}
        />
        <Carnival currentStage={3} />
        {/* <View style={styles.topContent}>
          {isFirstTime ? (
            <>
              <CreateJobPost />
            </>
          ) : (
            <>
              <NextPlan />
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
