import React, { memo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Image from 'react-native-scalable-image'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import Lottie from 'lottie-react-native'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

import { Images } from 'assets/images'
import Text from 'components/Text'
import Flex from 'components/Flex'
import { globalStyle } from 'styles/globalStyle'

interface ItemProps {
  item: any
  onPress: any
  currentIndex: number
}

const AssessmentItem = memo(({ item, onPress, currentIndex }: ItemProps) => {
  const styles = useStyleSheet(themedStyles)
  const isPending = item.status === 'pending'
  const maxQuestion = item?.assessment_answers.length

  const assessmentStatus = () => {
    switch (item.status) {
      case 'completed':
        return { text: 'Selesai', color: '#00D65B' }
      case 'pending':
      default:
        return { text: 'Belum Selesai', color: '#9393AA' }
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Flex alignItems='center' justify='space-between'>
        <Flex alignItems='center'>
          <View style={styles.viewCharacter}>
            {isPending ? (
              <Lottie
                source={Images.placeholderChar}
                loop
                autoPlay
                resizeMode='contain'
                style={{ width: 80 }}
              />
            ) : (
              <Image
                source={{ uri: item?.personality.image }}
                width={80}
                height={80}
              />
            )}
          </View>
          <Flex vertical justify='flex-start' alignItems='flex-start'>
            <View
              style={[
                styles.tag,
                { backgroundColor: assessmentStatus().color }
              ]}
            >
              <Text category='h9' style={{ color: '#FFF' }}>
                {assessmentStatus().text}
              </Text>
            </View>
            {isPending && (
              <Text category='h8-s'>
                Pertanyaan{' '}
                {currentIndex > maxQuestion ? maxQuestion : currentIndex}/
                {maxQuestion}
              </Text>
            )}
            {!isPending ? (
              <>
                <Text category='h8' mt={4}>
                  {dayjs(item?.completed_at)
                    .locale('id')
                    .format('DD MMM YYYY - h:mm A')}
                </Text>
                <Text category='h9' mt={4} status='info'>
                  Lihat detail
                </Text>
              </>
            ) : (
              <Text category='h9' mt={4} status='warning'>
                Lanjut untuk lihat hasil
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex justify='flex-end' alignItems='flex-end' vertical>
          <Flex alignItems='center'>
            <Text category='h6'>
              {isPending ? '????' : item?.personality.name}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <View style={styles.border} />
    </TouchableOpacity>
  )
})

export default AssessmentItem

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  viewCharacter: {
    marginRight: 0
  },
  onlineIcon: {
    width: 14,
    height: 14,
    position: 'absolute',
    borderRadius: 99,
    borderWidth: 2,
    bottom: 0,
    right: 0
  },
  icon: {
    marginRight: 4,
    ...globalStyle.icon16
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4
  },
  border: {
    opacity: 0.54,
    borderBottomWidth: 1,
    borderColor: 'color-basic-400',
    marginVertical: 8,
    marginHorizontal: 32
  }
})
