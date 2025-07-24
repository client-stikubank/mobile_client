import React, { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
} from "@ui-kitten/components";
import { isEmpty } from "lodash";

import { Images } from "assets/images";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { MainBottomTabStackParamList } from "navigation/types";
import ActiveCamp from "src/home/Components/ActiveCamp";

import TitleList from "../../requests/Components/TitleList";
import EmptyData from "../../requests/Components/EmptyData";

const QrActivities = memo(() => {
  const { t } = useTranslation(["request", "common"]);
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const refresh = useSelector((state: any) => state.Loading.refresh);

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} title="QR" />
      <Content padder>
        <View>
          {isEmpty(carnival?.active_camps) ? (
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
                  <TitleList
                    title="Sedang Berlangsung"
                    dataLength={0}
                    mt={32}
                  />
                  {carnival?.active_camps.map((activeCamp: any) => (
                    <ActiveCamp campItem={activeCamp} key={activeCamp.id} />
                  ))}
                </React.Fragment>
              )}
            </View>
          )}
        </View>
      </Content>
    </Container>
  );
});

export default QrActivities;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  empty: {},
});
