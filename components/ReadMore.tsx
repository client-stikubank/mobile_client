import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Text from 'components/Text'
import Flex from './Flex'
import { Icon } from '@ui-kitten/components'
import { globalStyle } from 'styles/globalStyle'

interface ReadMoreProps {
  text: string
  maxCount: number
  containerStyle?: ViewStyle
}

const Readmore = ({ text, maxCount, containerStyle }: ReadMoreProps) => {
  const [isReadmore, setReadMore] = React.useState(true)

  const displayString = text.slice(0, maxCount).concat('...')

  const onPressMore = () => setReadMore(!isReadmore)

  return (
    <>
      <View
        style={{
          ...containerStyle,
          alignItems: 'flex-end',
          flexDirection: 'row'
        }}
      >
        <Text category='h8-s' style={{ flex: 1, flexWrap: 'wrap' }}>
          {isReadmore ? displayString : text}
        </Text>
      </View>
      <Flex onPress={onPressMore} justify='flex-start' itemsCenter mt={4}>
        <Text category='h8-s' status={'info'} bold mr={4}>
          {isReadmore ? 'Lihat lebih banyak' : 'Lihat lebih sedikit'}
        </Text>
        <Icon pack='assets' name='arrowRight' style={globalStyle.icon16} />
      </Flex>
    </>
  )
}

export default React.memo(Readmore)
