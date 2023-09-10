import React, { memo } from "react";
import { View } from "react-native";
import {
  Avatar,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import dayjs from "dayjs";
import "dayjs/locale/id";

import { Images } from "assets/images";
import Text from "components/Text";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";

interface ItemProps {
  item: any;
  _onPress?(): void;
}

const RewardItem = memo(({ item, _onPress }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);

  const token = () => {
    switch (item.coin?.name) {
      case "Beryl":
        return { image: Images.tokenBeryl, color: "#2EB4AC" };
      case "Jenny":
        return { image: Images.tokenJenny, color: "#EE157F" };
      case "Ale":
        return { image: Images.tokenAle, color: "#96519B" };
      case "Mamo":
      default:
        return { image: Images.tokenMamo, color: "#FFC40C" };
    }
  };

  const rewardType = () => {
    switch (item.reward_type) {
      case "join_camp":
      default:
        return { text: "Youthcamp", color: "#EE157F" };
    }
  };

  return (
    <View style={styles.container}>
      <Flex alignItems="center" justify="space-between">
        <Flex>
          <View style={styles.viewAvatar}>
            <Avatar
              source={token().image}
              size="small"
              shape="round"
              style={{ backgroundColor: token().color }}
            />
          </View>
          <Flex vertical justify="flex-start" alignItems="flex-start">
            <View style={[styles.tag, { backgroundColor: rewardType().color }]}>
              <Text category="h9" style={{ color: "#FFF" }}>
                {rewardType().text}
              </Text>
            </View>
            <Text category="h8-s">
              Level {item?.activitable?.stage_camp.stage.level}
            </Text>
            <Text category="h9-s">
              {item?.activitable?.stage_camp.camp.title}
            </Text>
            <Text category="h9" mt={4}>
              {dayjs(item?.updated_at)
                .locale("id")
                .format("DD MMM YYYY - h:mm A")}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="flex-end" alignItems="flex-end" vertical>
          <Text category="h6" style={{ color: token().color }}>
            +{item.amount}
          </Text>
          <Flex alignItems="center">
            <Icon pack="assets" name="hourlyRate" style={styles.icon} />
            <Text category="h8-s" status="placeholder">
              {item.coin?.name}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <View style={styles.border} />
    </View>
  );
});

export default RewardItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
  },
  viewAvatar: {
    marginRight: 12,
  },
  onlineIcon: {
    width: 14,
    height: 14,
    position: "absolute",
    borderRadius: 99,
    borderWidth: 2,
    bottom: 0,
    right: 0,
  },
  icon: {
    marginRight: 4,
    ...globalStyle.icon16,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  border: {
    opacity: 0.54,
    borderBottomWidth: 1,
    borderColor: "color-basic-400",
    marginVertical: 16,
    marginHorizontal: 32,
  },
});
