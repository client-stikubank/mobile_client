import React, { memo } from 'react'
import { Share } from 'react-native'
import {
  TopNavigation,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'
import Image from 'react-native-scalable-image'
import { useSelector } from 'react-redux'

import { Images } from 'assets/images'
import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import Flex from 'components/Flex'
import MonstaText from 'components/MonstaText'
import ButtonFill from 'components/ButtonFill'
import { globalStyle } from 'styles/globalStyle'

const InviteAndWin = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['more', 'invite_and_win'])

  const { userProfile } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile
  }))

  const shareRefferalCode = () => {
    Share.share({
      message: userProfile?.refferal_code
    })
  }

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t('invite_and_win:title').toString()}
      />
      <Content padder>
        <Flex vertical={true} itemsCenter center mt={16}>
          <Image source={Images.mascotGroupOne} width={280} />
          <Flex style={styles.inviteAndWin}>
            <Image source={Images.inviteAndWin} width={280} />
          </Flex>
        </Flex>
        <Text category='h8' center mb={8} mh={24}>
          {t('invite_and_win:description')}
        </Text>
        <Flex itemsCenter vertical={true} mb={24}>
          <MonstaText amount='0001' category='h7' radius={13} />
        </Flex>
        <Flex style={styles.clipboard} level='2' itemsCenter>
          <Text category='h7' bold>
            {userProfile?.refferal_code}
          </Text>
          <ButtonFill icon='share' onPress={shareRefferalCode} />
        </Flex>
        {/* <Text center mv={32}>
          {t('more:or-share')}
        </Text>
        <Flex
          style={styles.clipboard}
          level='2'
          onPress={() => {
            setCopyPromoCode(false)
            setCopyLink(true)
          }}
        >
          <Text category='h7' bold>
            {`youthcamp.com/refer/${userProfile?.refferal_code}`}
          </Text>
          <Text category='h7' status={copyLink ? 'success' : 'link'} bold>
            {copyLink ? 'Copied' : 'Copy'}
          </Text>
        </Flex> */}
        {/* <Text center mt={32} mb={20}>
          {t('more:share-via')}
        </Text> */}
      </Content>
    </Container>
  )
})

export default InviteAndWin

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  inviteAndWin: {
    marginTop: 24,
    marginBottom: 32
  },
  clipboard: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    ...globalStyle.shadow
  },
  button: {
    marginTop: 8
  }
})
