import React from 'react'
import { Datepicker, NativeDateService } from '@ui-kitten/components'

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
      initialVisibleDate={new Date(2000, 0, 1)}
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

export default React.memo(DatepickerField)
