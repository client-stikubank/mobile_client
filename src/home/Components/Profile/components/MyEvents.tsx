import React, { memo, useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { StyleService, useStyleSheet, Button } from '@ui-kitten/components'
import Swiper from 'react-native-swiper'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import Image from 'react-native-scalable-image'

import Text from 'components/Text'
import Flex from 'components/Flex'
import { RootStackParamList } from 'navigation/types'
import { getUserEvents } from 'store/actions'
import { globalStyle } from 'styles/globalStyle'

const MyEvents = memo(() => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const styles = useStyleSheet(themedStyles)

  const { userEvents, uEventPaginations, uEventParams, userProfile, modal } =
    useSelector((state: any) => ({
      userEvents: state.UserEvent.userEvents,
      uEventPaginations: state.UserEvent.pagination,
      uEventParams: state.UserEvent.currentParams,
      userProfile: state.UserProfile.userProfile,
      modal: state.Modal.modal
    }))

  useEffect(() => {
    reduxDispatch(getUserEvents())
  }, [])

  const renderPagination = (index: number, total: number, context: Swiper) => {
    return (
      <Flex itemsCenter justify='center'>
        <Text status='info' category='h7' mt={-100}>
          {index + 1}/{uEventPaginations.count}
        </Text>
      </Flex>
    )
  }

  const loadMoreEvents = (index: number) => {
    if (index >= uEventPaginations.count - 2 && uEventPaginations.next) {
      reduxDispatch(
        getUserEvents({
          ...uEventParams,
          page: uEventPaginations.current + 1
        })
      )
    }
  }

  const _onEventDetail = (userEvent: any) => {
    navigate('EventDetail', {
      event: userEvent?.event,
      isPaid: true,
      userEvent: userEvent
    })
  }

  return (
    <View style={styles.myGiftsContainer}>
      <Text style={styles.subTitle} category='h6' mt={24}>
        My Events
      </Text>
      {userEvents.length > 0 ? (
        <Flex mh={0}>
          <Swiper
            style={styles.swiper}
            loop={false}
            renderPagination={renderPagination}
            onIndexChanged={index => loadMoreEvents(index)}
          >
            {userEvents.map((userEvent: any) => (
              <View style={styles.eventCardWrapper} key={userEvent.id}>
                <Flex justify='center'>
                  <Image
                    source={{ uri: userEvent?.event?.image?.url }}
                    style={{
                      borderRadius: 4
                    }}
                    resizeMode='contain'
                    width={300}
                  />
                </Flex>
                <Flex justify='center'>
                  <Button
                    size='small'
                    status='outline'
                    style={styles.buttonDetail}
                    onPress={() => _onEventDetail(userEvent)}
                  >
                    Lihat Tiket
                  </Button>
                </Flex>
              </View>
            ))}
          </Swiper>
        </Flex>
      ) : (
        <Text mb={16}>Kamu belum pernah mengikuti acara/event 🙁</Text>
      )}
    </View>
  )
})

export default MyEvents

const themedStyles = StyleService.create({
  myGiftsContainer: {},
  subTitle: {
    marginBottom: 8
  },
  swiper: {
    height: 425
  },
  eventCardWrapper: {
    paddingHorizontal: 24,
    ...globalStyle.shadow
  },
  buttonDetail: {
    marginTop: 16
  }
})
