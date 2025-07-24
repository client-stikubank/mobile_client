import React, { memo } from "react";
import { ImageBackground, View, Text as TextNative } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";

import { Images } from "assets/images";
import Text from "components/Text";
import Container from "components/Container";
import Content from "components/Content";
import NavigationAction from "components/NavigationAction";
import Flex from "components/Flex";
import { navigate } from "navigation/RootNavigation";
import { createAssessments } from "store/actions";
import { globalStyle } from "styles/globalStyle";

import AssessmentItem from "./components/AssessmentItem";

const Assessment = memo(() => {
  const reduxDispatch = useDispatch();
  const { dispatch } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["home", "common"]);

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const assessments = useSelector((state: any) => state.Assessment.assessments);
  const refresh = useSelector((state: any) => state.Loading.refresh);

  const isPending = carnival.current_assessment_index > 0;

  const startAssessment = () => {
    reduxDispatch(
      createAssessments(carnival.carnival.id, () =>
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "AssessmentAnswer",
                params: { isContinue: false },
              },
            ],
          })
        )
      )
    );
  };

  const continueAssessment = () => {
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "AssessmentAnswer",
            params: { isContinue: true },
          },
        ],
      })
    );
  };

  const onAssesmentDetail = (assessment: any) => {
    navigate("AssessmentDetail", { firstTime: false, assessment: assessment });
  };

  const renderItem = (item: any) => {
    return (
      <AssessmentItem
        key={item.id}
        item={item}
        onPress={(item: any) =>
          item.status === "pending"
            ? continueAssessment()
            : onAssesmentDetail(item)
        }
        currentIndex={carnival.current_assessment_index}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("home:assessment")}
        accessoryLeft={() => <NavigationAction />}
      />
      <Content>
        <Layout style={styles.cardLayout} level="1">
          <View style={styles.startCard}>
            <ImageBackground
              source={Images.cardBackground}
              style={styles.cardBackground}
              resizeMode="cover"
            >
              <Flex style={styles.cardContent} vertical justify="space-between">
                <TextNative style={styles.cardTitle}>
                  Cari tahu kepribadian kamu!
                </TextNative>
                <Button
                  onPress={isPending ? continueAssessment : startAssessment}
                  status="gift"
                >
                  {isPending ? "Lanjutin Tes" : "Mulai Tes"}
                </Button>
              </Flex>
            </ImageBackground>
          </View>
        </Layout>

        {!isEmpty(carnival.last_assessment) && (
          <View style={styles.section}>
            <Text category="h3" mb={12}>
              Tes Kamu
            </Text>
            <AssessmentItem
              item={carnival.last_assessment}
              onPress={(item: any) =>
                item.status === "pending"
                  ? continueAssessment()
                  : onAssesmentDetail(item)
              }
              currentIndex={carnival.current_assessment_index}
            />
          </View>
        )}
        {assessments.length > 0 && (
          <View style={styles.section}>
            <Text category="h3" mb={12}>
              Tes Temanmu
            </Text>
            {assessments.map((item: any) => renderItem(item))}
          </View>
        )}
      </Content>
    </Container>
  );
});

export default Assessment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  cardLayout: {
    height: 300,
    paddingHorizontal: 24,
  },
  section: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  content: {},
  startCard: {
    borderRadius: 16,
    ...globalStyle.shadow,
  },
  cardBackground: {
    borderRadius: 16,
    overflow: "hidden",
    height: "100%",
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
    fontSize: 52,
    lineHeight: 52,
    fontWeight: "800",
  },
});
