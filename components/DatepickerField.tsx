import React from 'react'
import {
  useTheme,
  useStyleSheet,
  StyleService,
  Datepicker,
  NativeDateService
} from '@ui-kitten/components'

interface DatepickerProps {
  label: string
  errors: boolean
  errorMessage: any
  onChange: any
  value: any
  style: any
}

const DatepickerField = ({
  label,
  errors,
  errorMessage,
  onChange,
  value,
  style
}: DatepickerProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  const i18n: any = {
    dayNames: {
      short: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      long: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    },
    monthNames: {
      short: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des'
      ],
      long: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ]
    }
  }

  const localeDateService = new NativeDateService('id', {
    i18n,
    format: 'DD MMMM YYYY'
  })

  return (
    <Datepicker
      label={label}
      status={errors ? 'warning' : 'basic'}
      style={{ ...style }}
      textStyle={{
        fontSize: 40
      }}
      /* @ts-ignore */
      placeholder={null}
      min={new Date(1900, 0, 0)}
      max={new Date()}
      onSelect={(nextDate: any) => {
        onChange(nextDate)
      }}
      date={value}
      filter={() => true}
      dateService={localeDateService}
      caption={errorMessage}
    />
  )
}

const themedStyles = StyleService.create({
  datepicker: {}
})

export default React.memo(DatepickerField)
