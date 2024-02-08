import React, { memo } from "react";
import { View, Image, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Images } from "assets/images";
import Text from "components/Text";
import Container from "components/Container";
import keyExtractor from "utils/keyExtractor";

import RewardItem from "./Components/RewardItem";

const Reward = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["reward", "common"]);

  const rewards = useSelector((state: any) => state.Reward.rewards);
  const refresh = useSelector((state: any) => state.Loading.refresh);

  const ListEmptyComponent = React.useCallback(() => {
    return refresh && rewards.length === 0 ? null : (
      <View style={styles.empty}>
        <Image source={Images.emptyFavorites} />
        <Text category="h6" center mt={58} mb={16}>
          {t("reward:noReward")}
        </Text>
        <Text category="h8-s" center mh={24}>
          {t("reward:noRewardDescription")}
        </Text>
      </View>
    );
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return <RewardItem item={item} _onPress={() => {}} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation title={t("reward:title").toString()} />
      <FlatList
        data={rewards.length > 0 ? rewards : []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={refresh}
      />
    </Container>
  );
});

export default Reward;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  empty: {
    alignItems: "center",
    marginTop: 120,
  },
  content: {
    marginTop: 24,
  },
});
