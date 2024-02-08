import React, { memo } from "react";
import { View, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import Image from "react-native-scalable-image";
import * as Linking from "expo-linking";
import {
  Icon,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Layout,
  Button,
} from "@ui-kitten/components";
import { truncate } from "lodash";
import dayjs from "dayjs";

import Content from "components/Content";
import Container from "components/Container";
import Flex from "components/Flex";
import Text from "components/Text";
import MonstaText from "components/MonstaText";
import NavigationAction from "components/NavigationAction";
import { navigate } from "navigation/RootNavigation";

const EventDetail = memo(() => {
  const route = useRoute();
  const { event, isPaid, userEvent }: any = route.params;
  const styles = useStyleSheet(themedStyles);
  const { width } = Dimensions.get("window");
  const durations = event?.duration.split(":");

  const onBuyEvent = () => {
    navigate("BuyEvent", { event: event });
  };

  const onEventScanner = () => {
    navigate("EventScanner", { userEvent: userEvent });
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={truncate(event?.title)}
      />
      <Content padder>
        <View>
          <Layout style={styles.content} level="2">
            <Image
              source={{ uri: event?.image?.url || event?.image }}
              width={width - 48}
            />
            <Flex justify="flex-start" alignItems="flex-start" padder pv={16}>
              <Flex
                vertical
                justify="flex-start"
                alignItems="flex-start"
                style={{ flex: 1 }}
              >
                <Text category="h7" bold mb={4}>
                  {event?.title}
                </Text>
                <Text category="h8-s">
                  {dayjs(event?.event_at).locale("id").format("DD MMM YYYY")}
                </Text>
                <Text category="h10-s">{event?.city?.name}</Text>
                <Flex justify="flex-start" mt={4}>
                  <MonstaText
                    amount={event?.reward_amount?.join("")}
                    category="h7"
                    radius={12}
                  />
                </Flex>
                <Flex mt={16} vertical>
                  <Flex justify="flex-start" mb={4} style={{ paddingRight: 8 }}>
                    <Icon pack="assets" name="location16" style={styles.icon} />
                    <Text category="h8-s">{event?.address}</Text>
                  </Flex>
                  <Flex justify="flex-start">
                    <Icon pack="assets" name="time" style={styles.icon} />
                    <Text category="h8-s">
                      {`${dayjs(event?.event_at)
                        .locale("id")
                        .format("HH:MM")} - ${dayjs(event?.event_at)
                        .locale("id")
                        .add(parseInt(durations[0]), "hours")
                        .add(parseInt(durations[1]), "minutes")
                        .format("HH:MM")} WIB`}
                    </Text>
                  </Flex>
                </Flex>
                <Flex mt={16}>
                  <Text>{event?.description}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Layout>
        </View>
      </Content>
      <View style={styles.navBottom}>
        <Flex justify="space-between" alignItems="center">
          <Button
            status="outline"
            size="small"
            onPress={() => Linking.openURL(event?.map_link)}
          >
            Get Direction
          </Button>
          {!isPaid ? (
            <Button size="small" onPress={onBuyEvent}>
              Beli Tiket
            </Button>
          ) : (
            <>
              {userEvent?.status === "used" ? (
                <Text status="info" category="h7">
                  Tiket sudah digunakan
                </Text>
              ) : (
                <Button size="small" onPress={onEventScanner}>
                  Scan Tiket
                </Button>
              )}
            </>
          )}
        </Flex>
      </View>
    </Container>
  );
});

export default EventDetail;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 100,
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
  navBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 36,
    borderTopWidth: 2,
    backgroundColor: "#FFF",
    borderColor: "#EE157F",
    height: 100,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "color-beryl",
    marginRight: 4,
  },
});
