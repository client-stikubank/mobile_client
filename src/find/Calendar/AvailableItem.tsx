import React, { memo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import {
  StyleService,
  useStyleSheet,
  Layout,
  Modal
} from '@ui-kitten/components'

import Text from 'components/Text'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import ModalOption from '../Component/ModalOption'
import Flex from 'components/Flex'
import { RootStackParamList } from 'navigation/types'
import { globalStyle } from 'styles/globalStyle'
import useLayout from 'hooks/useLayout'
import useModal from 'hooks/useModal'

interface AvailableProps {
  id: string | number | null
  availableTime: {
    morning: boolean
    afternoon: boolean
  }
  date: Date
}
interface IAvailableItemProps {
  startTime: Date
  endTime: Date
  data: AvailableProps[]
  onPress?(): void
}

const AvailableItem = memo(
  ({ data, startTime, endTime, onPress }: IAvailableItemProps) => {
    const styles = useStyleSheet(themedStyles)
    const { bottom } = useLayout()
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

    const { t } = useTranslation(['find', 'common'])
    const {
      modalRef: modalContact,
      show: showContact,
      hide: hideContact
    } = useModal()

    const _onContact = React.useCallback(() => {
      showContact()
    }, [])
    const _onCampDetail = () => navigate('CampDetail')


    let morning_office_hours = '08:00 - 11:00'
    let afternoon_office_hours = '13:30 - 18:00 '
    const Opacity = 0.54
    return (
      <Flex style={styles.container} mt={8} mb={24}>
        <View style={globalStyle.flexOne}>
          {data.map((item, i) => {
            return (
              <View key={i}>
                <Flex mb={i !== data.length - 1 ? 24 : 0}>
                  <View style={styles.date}>
                    <Text category='h8-s' uppercase>
                      {dayjs(item.date).locale('id').format('ddd')}
                    </Text>
                    <Text bold>{dayjs(item.date).format('DD')}</Text>
                  </View>
                  <View style={globalStyle.flexOne}>
                    {item.availableTime.morning === true ? (
                      <TouchableOpacity
                        onPress={_onContact}
                        activeOpacity={Opacity}
                      >
                        <Layout level={'7'} style={styles.item}>
                          <Flex>
                            <View>
                              <Text category='h7' bold status={'success'}>
                                {t('find:users')}
                              </Text>
                              <Text category='h8' status='success'>
                                0/10
                              </Text>
                              <Text category='h7' bold status={'success'}>
                                {t('find:available')}
                              </Text>
                              <Text category='h8' status='success'>
                                {morning_office_hours}
                              </Text>
                            </View>
                          </Flex>
                        </Layout>
                      </TouchableOpacity>
                    ) : null}
                    {item.availableTime.afternoon === true ? (
                      <TouchableOpacity
                        onPress={_onContact}
                        activeOpacity={Opacity}
                      >
                        <Layout level={'7'} style={styles.item}>
                          <Flex>
                            <View>
                              <Text category='h7' bold status={'success'}>
                                {t('find:users')}
                              </Text>
                              <Text category='h8' status='success'>
                                0/10
                              </Text>
                              <Text category='h7' bold status={'success'}>
                                {t('find:available')}
                              </Text>
                              <Text category='h8' status='success'>
                                {afternoon_office_hours}
                              </Text>
                            </View>
                          </Flex>
                        </Layout>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </Flex>
              </View>
            )
          })}
        </View>
        <Modal
          ref={modalContact}
          backdropStyle={globalStyle.backdropStyle}
          style={[
            styles.modal,
            {
              paddingBottom: bottom + 16
            }
          ]}
          onBackdropPress={hideContact}
        >
          <ModalOption
            onHide={() => {
              hideContact()
            }}
            children={[
              {
                title: t('find:join_now'),
                onPress: () => {
                  hideContact(), _onCampDetail()
                },
                status: 'basic'
              }
            ]}
          />
        </Modal>
      </Flex>
    )
  }
)

export default AvailableItem

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 24
  },
  item: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 16
  },
  date: {
    alignItems: 'center',
    marginRight: 24,
    width: 32
  },
  modal: {
    justifyContent: 'flex-end',
    flex: 1,
    height: '100%'
  }
})
