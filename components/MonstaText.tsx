import React from 'react'
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient'

import Text from 'components/Text'

interface MonstaProps {
  amount: string
  category?: string
  radius?: number
}

const MonstaText = ({ amount, category = 'h9', radius = 8 }: MonstaProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0.25, 0.5, 0.75, 1]}
      colors={[
        theme['color-beryl'],
        theme['color-ale'],
        theme['color-jenny'],
        theme['color-mamo']
      ]}
      style={[styles.tokenAmount, { borderRadius: radius }]}
    >
      <Text category={category} center style={styles.tokenAmountText}>
        {amount} Monsta
      </Text>
    </LinearGradient>
  )
}

const themedStyles = StyleService.create({
  tokenAmount: {
    backgroundColor: 'color-primary-100',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 2,
    overflow: 'hidden'
  },
  tokenAmountText: {
    color: 'color-basic-100'
  }
})

export default React.memo(MonstaText)
