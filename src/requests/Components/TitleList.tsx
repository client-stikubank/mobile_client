import React from 'react'
import { StyleProp, ViewProps } from 'react-native'

import Text from 'components/Text'
import Flex, { FlexProps } from 'components/Flex'
import { useTranslation } from 'react-i18next'

interface TitleListProps extends FlexProps {
  title: string
  dataLength: number
  style?: StyleProp<ViewProps>
  onSeeAll?(): void
}

const TitleList = ({
  title,
  dataLength,
  style,
  onSeeAll,
  ...props
}: TitleListProps) => {
  const { t } = useTranslation(['request', 'common'])
  return (
    <Flex style={[style]} {...props}>
      <Flex justify='flex-start' alignItems='center' mb={24}>
        <Text category='h6' bold>
          {title}
        </Text>
        {dataLength > 0 && (
          <Text category='para-m' mt={4} ml={8} status='placeholder'>
            {dataLength}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default TitleList
