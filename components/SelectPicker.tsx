import React from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components'

import Text from 'components/Text'

interface SelectPickerProps {
  items: any
  onChange: any
  value: any
  label: string
  errors: boolean
  errorMessage: any
}

const SelectPicker = ({
  items,
  onChange,
  value,
  label,
  errors,
  errorMessage
}: SelectPickerProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  const placeholder = {
    label: '',
    value: null,
    color: 'color-primary-100'
  }

  return (
    <View style={styles.pickerView}>
      <Text bold category='h8' style={styles.label}>
        {label}
      </Text>
      <RNPickerSelect
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        items={items}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />
      {errors && (
        <Text status='warning' category='h9' style={styles.labelWarning}>
          {errorMessage || 'Pilih salah satu!'}
        </Text>
      )}
    </View>
  )
}

const themedStyles = StyleService.create({
  pickerView: {
    marginBottom: 24
  },
  label: {
    color: 'color-basic-600',
    marginBottom: 4
  },
  labelWarning: {
    marginTop: 4
  }
})

const pickerSelectStyles = StyleService.create({
  inputIOS: {
    minHeight: 40,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderWidth: 0,
    borderColor: '#F0F0F0',
    paddingVertical: 7,
    fontSize: 14,
    fontWeight: '700'
  },
  inputAndroid: {
    minHeight: 40,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderWidth: 0,
    borderColor: '#F0F0F0',
    paddingVertical: 7,
    fontSize: 14,
    fontWeight: '700'
  }
})

export default React.memo(SelectPicker)
