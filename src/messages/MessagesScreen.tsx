import React, { memo, useEffect } from 'react'
import { View, Image, FlatList } from 'react-native'
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon
} from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { Images } from 'assets/images'
import Text from 'components/Text'
import Container from 'components/Container'
import { DATA_MESSAGES } from 'constants/Data'
import { RootStackParamList } from 'navigation/types'
import { getRewards } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'
import keyExtractor from 'utils/keyExtractor'

import RewardItem from './Components/RewardItem'

const MessagesScreen = memo(() => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['message', 'common'])

  const { rewards, refresh } = useSelector((state: any) => ({
    rewards: state.Reward.rewards,
    refresh: state.Loading.refresh
  }))

  const onRefresh = () => {
    reduxDispatch(getRewards())
  }

  const ListEmptyComponent = React.useCallback(() => {
    return refresh && rewards.length === 0 ? null : (
      <View style={styles.empty}>
        <Image source={Images.emptyFavorites} />
        <Text category='h6' center mt={58} mb={16}>
          {t('message:noReward')}
        </Text>
        <Text category='h8-s' center mh={24}>
          {t('message:noRewardDescription')}
        </Text>
      </View>
    )
  }, [])

  const renderItem = React.useCallback(({ item }) => {
    return <RewardItem item={item} _onPress={() => {}} />
  }, [])

  const onMessage = React.useCallback(() => {
    navigate('MessagesStack', { screen: 'Chat' })
  }, [])

  return (
    <Container style={styles.container}>
      <TopNavigation title={t('message:title').toString()} />
      <FlatList
        data={rewards.length > 0 ? rewards : []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        onRefresh={onRefresh}
        refreshing={refresh}
        // ListHeaderComponent={ListHeaderComponent}
      />
    </Container>
  )
})

export default MessagesScreen

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  empty: {
    alignItems: 'center',
    marginTop: 120
  },
  search: {
    ...globalStyle.shadowFade,
    marginTop: 16,
    marginBottom: 32,
    ...globalStyle.marH24
  },
  content: {
    marginTop: 24
  }
})
