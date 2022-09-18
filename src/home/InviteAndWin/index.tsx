import React, { memo } from 'react'
import {
  TopNavigation,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'
import Image from 'react-native-scalable-image'

import Text from 'components/Text'
import Content from 'components/Content'
import Container from 'components/Container'
import NavigationAction from 'components/NavigationAction'
import Flex from 'components/Flex'
import MonstaText from 'components/MonstaText'
import { globalStyle } from 'styles/globalStyle'
import ButtonFill from 'components/ButtonFill'
import { Images } from 'assets/images'

const InviteAndWin = memo(() => {
  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['more', 'invite_and_win'])

  const [copiedText, setCopiedText] = React.useState('')
  const [copyPromoCode, setCopyPromoCode] = React.useState(false)
  const [copyLink, setCopyLink] = React.useState(false)

  const PROMOTION_CODE = 'YC345928'
  const REFER_LINK = 'youthcamp.com/refer/u345928'

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
          <MonstaText amount='0021' category='h7' radius={13} />
        </Flex>
        <Flex
          style={styles.clipboard}
          level='2'
          onPress={() => {
            // copyToClipboard(PROMOTION_CODE);
            setCopyLink(false)
            setCopyPromoCode(true)
          }}
        >
          <Text category='h7' bold>
            {PROMOTION_CODE}
          </Text>
          <Text category='h7' status={copyPromoCode ? 'success' : 'link'} bold>
            {copyPromoCode ? 'Copied' : 'Copy'}
          </Text>
        </Flex>
        <Text center mv={32}>
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
            {REFER_LINK}
          </Text>
          <Text category='h7' status={copyLink ? 'success' : 'link'} bold>
            {copyLink ? 'Copied' : 'Copy'}
          </Text>
        </Flex>
        <Text center mt={32} mb={20}>
          {t('more:share-via')}
        </Text>
        <Flex mh={48} mb={32}>
          {DATA_SOCIAL.map((item, i) => {
            return (
              /* @ts-ignore */
              <ButtonFill icon={item.icon} key={i} status={item.status} />
            )
          })}
        </Flex>
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
const DATA_SOCIAL = [
  {
    id: 0,
    icon: 'facebook',
    status: 'facebook'
  },
  {
    id: 1,
    icon: 'instagram',
    status: 'instagram'
  },
  {
    id: 2,
    icon: 'twitter',
    status: 'twitter'
  },
  {
    id: 3,
    icon: 'call',
    status: 'success'
  }
]
