import React, { memo } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon
} from '@ui-kitten/components'

import Text from 'components/Text'
import MonstaText from 'components/MonstaText'
import { useTranslation } from 'react-i18next'
// import { ApplicationItemProps } from 'src/requests/Applications/ApplicationItem'
import { globalStyle } from 'styles/globalStyle'
import Flex from 'components/Flex'
import { RootStackParamList } from 'navigation/types'
import { Images } from 'assets/images'

interface CampItemProps {
  calendar?: any
  detail?: boolean
}

const CampItem = memo(({ calendar, detail }: CampItemProps) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  const styles = useStyleSheet(themedStyles)
  const { t } = useTranslation(['more', 'common'])

  const _onJoin = () => navigate('CampSchedule')

  return (
    <View>
      <Layout
        style={[styles.container, { paddingBottom: calendar ? 24 : 0 }]}
        level='2'
      >
        <ImageBackground
          source={Images.cardHeader}
          style={styles.headerImage}
          resizeMode='cover'
        >
          <Text category='h2' bold style={styles.cardTitle}>
            YouthCamp Level 1
          </Text>
        </ImageBackground>
        {calendar ? (
          <View style={styles.calendarView}>{calendar}</View>
        ) : (
          <React.Fragment>
            <Flex justify='flex-start' itemsCenter mb={8} mh={16} mt={16}>
              <Icon pack='assets' name='baby' style={styles.icon} />
              <Text category='h7' ml={8} bold>
                H. Ahmad Sahroni, S.E., M.I. Kom.
              </Text>
            </Flex>
            <Flex justify='flex-start' itemsCenter mb={8} mh={16}>
              <Icon pack='assets' name='location16' style={styles.icon} />
              <Text category='h7-s' ml={8}>
                Bandung
              </Text>
            </Flex>
            <Flex justify='flex-start' itemsCenter mb={8} mh={16}>
              <MonstaText amount='1126' category='h8' radius={11} />
            </Flex>
            {detail ? (
              <React.Fragment>
                <Flex justify='flex-start' itemsCenter mb={8} mh={16} mt={8}>
                  <Icon pack='assets' name='calendar' style={styles.icon} />
                  <Text category='h7' ml={8} bold>
                    25 September 2022
                  </Text>
                </Flex>
                <Flex justify='flex-start' itemsCenter mb={16} mh={16}>
                  <Icon pack='assets' name='time' style={styles.icon} />
                  <Text category='h7-s' ml={8}>
                    08.00 - 11.00
                  </Text>
                </Flex>
              </React.Fragment>
            ) : (
              <Flex
                justify='space-between'
                alignItems='flex-end'
                style={styles.cardFooter}
              >
                <Flex
                  style={styles.button}
                  itemsCenter
                  center
                  onPress={() => _onJoin()}
                >
                  <Text category='h7' style={{ color: '#FFF' }}>
                    Join
                  </Text>
                </Flex>
              </Flex>
            )}
          </React.Fragment>
        )}
      </Layout>
    </View>
  )
})

export default CampItem

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 24,
    maxHeight: '100%'
  },
  calendarView: {
    marginBottom: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden'
  },
  headerImage: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden'
  },
  cardTitle: {
    color: 'color-basic-100',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 24,
    marginVertical: 8
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: 'text-placeholder-color',
    marginTop: 2
  },
  button: {
    backgroundColor: 'color-primary-100',
    paddingHorizontal: 32,
    paddingVertical: 4,
    borderRadius: 50
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'color-carnival',
    backgroundColor: 'color-basic-200',
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  }
})
