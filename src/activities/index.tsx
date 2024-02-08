import React, { memo, useEffect, useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import BasicTabBar from "components/BasicTabBar";
import Container from "components/Container";
import { getUserStageSchedules } from "store/actions";
import { globalStyle } from "styles/globalStyle";
import keyExtractor from "utils/keyExtractor";

import CampTab from "./components/CampTab";

const Activities = memo(() => {
  const reduxDispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["activities"]);
  const [activeIndex, setActiveIndex] = useState(0);

  const refresh = useSelector((state: any) => state.Loading.refresh);

  useEffect(() => {
    reduxDispatch(getUserStageSchedules());
  }, []);

  const shouldLoadComponent = (index: number) => index === activeIndex;

  const onRefresh = () => {
    if (activeIndex === 0) {
      reduxDispatch(getUserStageSchedules());
    }
  };

  const ListFooterComponent = useCallback(() => {
    return (
      <View style={styles.footer}>
        <ViewPager
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
          style={globalStyle.flexOne}
          swipeEnabled={true}
          shouldLoadComponent={shouldLoadComponent}
        >
          <CampTab />
          {/* <CampTab />
          <CampTab /> */}
        </ViewPager>
      </View>
    );
  }, [activeIndex]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <Layout>
        <BasicTabBar
          style={styles.tabBar}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          tabs={[
            t("activities:camp"),
            // t('activities:treasure_hunt'),
            // t('activities:gift')
          ]}
        />
      </Layout>
    );
  }, [activeIndex]);

  return (
    <Container style={styles.container}>
      <TopNavigation title={t("activities:title").toString()} />
      <FlatList
        renderItem={() => <></>}
        stickyHeaderIndices={[0]}
        keyExtractor={keyExtractor}
        data={[0]}
        contentContainerStyle={styles.content}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refresh}
      />
    </Container>
  );
});

export default Activities;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  tabBar: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  footer: {
    marginHorizontal: 24,
    paddingBottom: 40,
  },
});
