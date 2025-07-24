import React, { memo, useEffect } from "react";
import { View, Text as TextNative, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { isEmpty, capitalize } from "lodash";
import dayjs from "dayjs";

import { getEvents } from "store/actions";
import { Images } from "assets/images";
import Content from "components/Content";
import Container from "components/Container";
import Flex from "components/Flex";
import Text from "components/Text";
import MonstaText from "components/MonstaText";
import NavigationAction from "components/NavigationAction";
import { MainBottomTabStackParamList } from "navigation/types";
import { navigate } from "navigation/RootNavigation";
import { globalStyle } from "styles/globalStyle";

import EmptyData from "../../requests/Components/EmptyData";
import { TouchableOpacity } from "react-native-gesture-handler";
import AutoHeightImage from "components/AutoHeightImage";

const Events = memo(() => {
  const reduxDispatch = useDispatch();
  const { t } = useTranslation(["request", "common"]);
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    reduxDispatch(getEvents());
  }, []);

  const refresh = useSelector((state: any) => state.Loading.refresh);
  const events = useSelector((state: any) => state.Event.events);

  const onEventDetail = (eventItem: any) => {
    navigate("EventDetail", { event: eventItem });
  };

  const { width } = Dimensions.get("window");

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title="Acara/Event"
      />
      <Content padder>
        <View>
          {isEmpty(events) ? (
            !refresh && (
              <EmptyData
                image={Images.noBooking}
                title={t("request:noEvents")}
                description={t("request:noEventsDescription")}
              />
            )
          ) : (
            <View>
              {events.map((event: any) => (
                <TouchableOpacity
                  key={event.id}
                  activeOpacity={0.8}
                  onPress={() => onEventDetail(event)}
                >
                  <Layout style={styles.content} level="2">
                    <AutoHeightImage
                      source={{ uri: event?.image }}
                      width={width - 48}
                      contentFit="contain"
                    />
                    <Flex
                      justify="flex-start"
                      alignItems="flex-start"
                      padder
                      pv={16}
                    >
                      <Flex
                        vertical
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{ flex: 1 }}
                      >
                        <Text category="h7" bold mb={8}>
                          {event?.title}
                        </Text>
                        <Text category="h8-s">
                          {dayjs(event?.event_at)
                            .locale("id")
                            .format("DD MMM YYYY")}
                        </Text>
                        <Text category="h10-s">{event?.city?.name}</Text>
                        <Flex justify="flex-start" mt={8} vertical>
                          <Text category="h9" mb={4}>
                            Harga Tiket
                          </Text>
                          <MonstaText
                            amount={event?.reward_amount?.join("")}
                            category="h8"
                            radius={11}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Layout>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </Content>
    </Container>
  );
});

export default Events;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginBottom: 24,
    borderRadius: 12,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#9393AA",
    borderRightColor: "#9393AA",
    borderColor: "#EE157F",
    overflow: "hidden",
  },
  empty: {},
});
