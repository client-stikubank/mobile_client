import React from 'react'

import Text from 'components/Text'
import {
  useStyleSheet,
  StyleService,
  Icon,
  useTheme
} from '@ui-kitten/components'
import dayjs from 'utils/dayjs'
import Flex, { FlexProps } from './Flex'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { StyleProp, ViewStyle } from 'react-native'

interface DatePickerProps extends FlexProps {
  label: string
  time: Date
  show: boolean
  onChange: any
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  style?: StyleProp<ViewStyle>
}

const DatePicker = ({
  time,
  show,
  onChange,
  style,
  setShow,
  label,
  ...rest
}: DatePickerProps) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()
  const [date, setDate] = React.useState<Date>(time)
  const _onPress = () => {
    setShow(!show)
  }
  return (
    <Flex
      onPress={_onPress}
      style={[
        styles.container,
        {
          borderBottomColor: show
            ? theme['text-link-color']
            : theme['background-basic-color-3']
        },
        style
      ]}
      {...rest}
      vertical
    >
      <Text category='h8' bold status={'placeholder'} mb={8}>
        {label}
      </Text>
      <Flex justify='flex-start' itemsCenter>
        <Icon pack='assets' name='calendar' />
        <Text category='h7' ml={12} bold>
          {dayjs(date).locale('id').format('DD MMMM YYYY')}
        </Text>
        <DateTimePickerModal
          isVisible={show}
          mode={'date'}
          date={date}
          onConfirm={e => {
            setShow(false)
            onChange(e)
            setDate(e)
          }}
          onCancel={() => setShow(!show)}
        />
      </Flex>
    </Flex>
  )
}

export default DatePicker

const themedStyles = StyleService.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: 'background-basic-color-3',
    flex: 1,
    paddingBottom: 8
  }
})
