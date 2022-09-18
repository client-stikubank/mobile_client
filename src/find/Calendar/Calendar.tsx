import React, { memo } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout
} from '@ui-kitten/components'

import Content from 'components/Content'
import AvailableItem from './AvailableItem'

const Calendar = memo(() => {
  const styles = useStyleSheet(themedStyles)

  return (
    <Content>
      <Layout level='2' style={styles.container}>
        {DATA_AVAILABLE.map((item, i) => {
          return (
            <AvailableItem
              data={item.data}
              startTime={item.startTime}
              endTime={item.endTime}
              key={i}
            />
          )
        })}
      </Layout>
    </Content>
  )
})

export default Calendar

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 24,
    borderRadius: 16
  }
})

const DATA_AVAILABLE = [
  {
    startTime: new Date('2021-11-05'),
    endTime: new Date('2021-11-11'),
    data: [
      {
        id: '1',
        availableTime: {
          morning: true,
          afternoon: true
        },
        date: new Date(1649135103000)
      }
    ]
  },
  {
    startTime: new Date('2021-11-12'),
    endTime: new Date('2021-11-18'),
    data: [
      {
        id: '1',
        availableTime: {
          morning: true,
          afternoon: true
        },
        date: new Date('2021-11-12')
      },
      {
        id: '2',
        availableTime: {
          morning: true,
          afternoon: false
        },
        date: new Date('2021-11-13')
      }
    ]
  },
  {
    startTime: new Date('2021-11-19'),
    endTime: new Date('2021-11-25'),
    data: [
      {
        id: '1',
        availableTime: {
          morning: true,
          afternoon: true
        },
        date: new Date('2021-11-19')
      },
      {
        id: '2',
        availableTime: {
          morning: true,
          afternoon: false
        },
        date: new Date('2021-11-20')
      }
    ]
  }
]
