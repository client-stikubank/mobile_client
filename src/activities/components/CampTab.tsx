import React, { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { isEmpty } from "lodash";

import { Images } from "assets/images";
import ActiveCamp from "src/home/Components/ActiveCamp";

import TitleList from "./TitleList";
import EmptyData from "./EmptyData";

const CampTab = memo(() => {
  const { t } = useTranslation(["request", "common"]);
  const styles = useStyleSheet(themedStyles);

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const userStageSchedules = useSelector(
    (state: any) => state.UserStageSchedule.userStageSchedules
  );
  const refresh = useSelector((state: any) => state.Loading.refresh);

  return (
    <View style={styles.container}>
      {userStageSchedules?.length <= 0 && isEmpty(carnival?.active_camps) ? (
        !refresh && (
          <EmptyData
            image={Images.noBooking}
            title={t("request:noSchedules")}
            description={t("request:noSchedulesDescription")}
          />
        )
      ) : (
        <View>
          {!isEmpty(carnival?.active_camps) && (
            <React.Fragment>
              <TitleList title="Sedang Berlangsung" dataLength={0} mt={32} />
              {carnival?.active_camps.map((activeCamp: any) => (
                <ActiveCamp campItem={activeCamp} key={activeCamp.id} />
              ))}
            </React.Fragment>
          )}

          {userStageSchedules.length > 0 && (
            <>
              <TitleList
                title="Telah Diikuti"
                dataLength={userStageSchedules.length}
                mt={32}
              />
              {userStageSchedules.map((schedule: any) => (
                <ActiveCamp campItem={schedule} key={schedule.id} />
              ))}
            </>
          )}
        </View>
      )}
    </View>
  );
});

export default CampTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
