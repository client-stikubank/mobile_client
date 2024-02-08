import React, { memo } from "react";
import { RefreshControl } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import { getStageCamp } from "store/actions";
import Content from "components/Content";
import AvailableItem from "./AvailableItem";

interface CalendarProps {
  schedules?: any;
}

const Calendar = memo(({ schedules }: CalendarProps) => {
  const reduxDispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);

  const stageCamp = useSelector((state: any) => state.StageCamp.stageCamp);
  const refresh = useSelector((state: any) => state.Loading.refresh);

  const onRefresh = () => {
    if (!isEmpty(stageCamp)) {
      reduxDispatch(getStageCamp(stageCamp));
    }
  };

  return (
    <Content
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
    >
      <Layout level="2" style={styles.container}>
        {schedules?.length > 0
          ? schedules.map((schedule: any) => (
              <AvailableItem data={schedule} key={schedule.date} />
            ))
          : null}
      </Layout>
    </Content>
  );
});

export default Calendar;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 24,
    borderRadius: 16,
  },
});
