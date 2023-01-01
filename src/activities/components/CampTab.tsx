import React, { memo } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { isEmpty } from 'lodash'

import { Images } from 'assets/images'
import Flex from 'components/Flex'
import ActiveCamp from 'src/home/Components/ActiveCamp'

import TitleList from './TitleList'
import EmptyData from './EmptyData'

const CampTab = memo(() => {
  const { t } = useTranslation(['request', 'common'])
  const styles = useStyleSheet(themedStyles)

  const { carnival, userStageSchedules, refresh } = useSelector(
    (state: any) => ({
      carnival: state.Carnival.carnival,
      userStageSchedules: state.UserStageSchedule.userStageSchedules,
      refresh: state.Loading.refresh
    })
  )

  return (
    <View style={styles.container}>
      {userStageSchedules?.length <= 0 && isEmpty(carnival?.active_camp) ? (
        !refresh && (
          <EmptyData
            image={Images.noBooking}
            title={t('request:noSchedules')}
            description={t('request:noSchedulesDescription')}
          />
        )
      ) : (
        <View>
          {!isEmpty(carnival?.active_camp) && (
            <React.Fragment>
              <TitleList title='Sedang Berlangsung' dataLength={0} mt={32} />
              <ActiveCamp />
            </React.Fragment>
          )}

          {userStageSchedules.length > 0 && (
            <>
              <TitleList
                title='Telah Diikuti'
                dataLength={userStageSchedules.length}
                mt={32}
              />
              {userStageSchedules.map((schedule: any) => (
                <Flex mb={16} key={schedule.id}>
                  <ActiveCamp campItem={schedule} />
                </Flex>
              ))}
            </>
          )}
        </View>
      )}
    </View>
  )
})

export default CampTab

const themedStyles = StyleService.create({
  container: {
    flex: 1
  }
})
