import React, { memo } from 'react'
import { View, ImageRequireSource } from 'react-native'
import { useDispatch } from 'react-redux'
import { StyleService, useStyleSheet, Avatar } from '@ui-kitten/components'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import Text from 'components/Text'
import Flex from 'components/Flex'
import NavigationAction from 'components/NavigationAction'
import { HomeStackParamList } from 'navigation/types'
import { homeDisplay } from 'store/actions'

interface HeaderOptionProps {
  name: string
  avatar: ImageRequireSource
  email: string
}

const HeaderMoreOption = memo(({ email, avatar, name }: HeaderOptionProps) => {
  const reduxDispatch = useDispatch()
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>()
  const styles = useStyleSheet(themedStyles)
  const _onProfile = () => {
    reduxDispatch(homeDisplay('profile'))
    navigate('HomeSrc')
  }
  const _onEditProfile = () => navigate('EditProfile')

  return (
    <Flex itemsCenter mb={48}>
      <Flex itemsCenter justify='flex-start'>
        <Flex onPress={_onProfile}>
          <Avatar
            source={avatar}
            /* @ts-ignore */
            style={styles.avatar}
            shape='rounded'
          />
        </Flex>
        <View>
          <Text category='h6' bold>
            {name}
          </Text>
          <Text category='h8-s' status={'placeholder'} mt={4}>
            {email}
          </Text>
        </View>
      </Flex>
      <NavigationAction
        icon='edit_profile'
        status='facebook'
        onPress={_onEditProfile}
      />
    </Flex>
  )
})

export default HeaderMoreOption

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  avatar: {
    marginRight: 16,
    backgroundColor: 'color-mamo'
  },
  notification: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: 'color-danger-100',
    justifyContent: 'center',
    right: -4,
    top: -2
  }
})
