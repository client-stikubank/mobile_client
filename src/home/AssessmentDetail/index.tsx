import React, { memo } from "react";
import { ImageBackground, View, Text as TextNative } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Images } from "assets/images";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import { ScrollView } from "react-native-gesture-handler";
import ButtonFill from "components/ButtonFill";
import AutoHeightImage from "components/AutoHeightImage";

const AssessmentDetail = memo(() => {
  const { dispatch } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute();
  const { firstTime, assessment }: any = route.params;
  const { t } = useTranslation(["home", "common"]);

  const assessmentDetail = useSelector(
    (state: any) => state.Assessment.assessment
  );

  const item = firstTime ? assessmentDetail : assessment;
  const results = JSON.parse(item.results);
  const bars = [
    {
      title1: `${
        (parseInt(results["extrovert"] || 0) / 5) * 100
      }% (E) Extrovert`,
      title2: `Introvert (I) ${
        (parseInt(results["introvert"] || 0) / 5) * 100
      }%`,
      key1: "extrovert",
      key2: "introvert",
    },
    {
      title1: `${
        (parseInt(results["intuition"] || 0) / 5) * 100
      }% (N) Intuition`,
      title2: `Sensing (S) ${(parseInt(results["sensing"] || 0) / 5) * 100}%`,
      key1: "intuition",
      key2: "sensing",
    },
    {
      title1: `${(parseInt(results["thinking"] || 0) / 5) * 100}% (T) Thinking`,
      title2: `Feeling (F) ${(parseInt(results["feeling"] || 0) / 5) * 100}%`,
      key1: "thinking",
      key2: "feeling",
    },
    {
      title1: `${
        (parseInt(results["perceiving"] || 0) / 5) * 100
      }% (P) Perceiving`,
      title2: `Judging (J) ${(parseInt(results["judging"] || 0) / 5) * 100}%`,
      key1: "perceiving",
      key2: "judging",
    },
  ];

  const onHome = () => {
    dispatch(
      CommonActions.reset({
        routes: [{ name: "MainBottomTab" }],
      })
    );
  };

  return (
    <Container style={styles.container}>
      {!firstTime && (
        <TopNavigation
          title={t("home:assessment")}
          accessoryLeft={() => <NavigationAction />}
        />
      )}
      <ScrollView style={styles.content}>
        <Flex justify="flex-start" alignItems="center" vertical mb={32}>
          <AutoHeightImage
            source={{ uri: item?.personality.image }}
            width={150}
            contentFit="contain"
          />
          <ImageBackground
            source={Images.pageBackground}
            style={styles.cardBackground}
            resizeMode="cover"
          >
            <Flex
              style={styles.cardContent}
              vertical
              justify="flex-start"
              alignItems="center"
            >
              <TextNative style={styles.cardTitle}>
                {item.personality.name}
              </TextNative>
              {bars.map((bar: any) => (
                <View key={bar.title1} style={{ width: "100%" }}>
                  <Flex mt={8} justify="space-between">
                    <TextNative style={styles.answerTitle}>
                      {bar.title1}
                    </TextNative>
                    <TextNative style={styles.answerTitle}>
                      {bar.title2}
                    </TextNative>
                  </Flex>
                  <Flex
                    mt={8}
                    mb={8}
                    justify="space-between"
                    style={styles.answerBars}
                  >
                    <View
                      style={[
                        styles.answerBar,
                        styles.answerBarRight,
                        {
                          flex: parseInt(results[bar.key1] || 0) / 5,
                          backgroundColor: "#EE157F",
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.answerBar,
                        styles.answerBarLeft,
                        {
                          flex: parseInt(results[bar.key2] || 0) / 5,
                          backgroundColor: "#FFC40C",
                        },
                      ]}
                    />
                  </Flex>
                </View>
              ))}
            </Flex>
          </ImageBackground>
        </Flex>
        <Text category="h3" bold mb={8}>
          Tentang Kepribadian Kamu
        </Text>
        <Text mb={firstTime ? 0 : 16}>{item.personality.description}</Text>
        {firstTime && (
          <Flex alignItems="center" justify="center" mb={16} mt={16}>
            <ButtonFill
              status="basic"
              icon="home"
              size="medium"
              onPress={onHome}
            />
          </Flex>
        )}
      </ScrollView>
    </Container>
  );
});

export default AssessmentDetail;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  cardContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  cardTitle: {
    color: "color-basic-100",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontSize: 32,
    fontWeight: "800",
  },
  answerBars: {
    width: "100%",
    borderWidth: 1,
    borderColor: "color-basic-100",
    overflow: "hidden",
    ...globalStyle.border16,
    ...globalStyle.shadow,
  },
  answerTitle: {
    color: "color-basic-100",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontWeight: "800",
  },
  answerBar: {
    height: 20,
  },
  answerBarRight: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  answerBarLeft: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});
