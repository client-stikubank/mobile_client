import React, { memo, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import { shuffle } from "lodash";
import { ImageBackground, View, BackHandler, Alert } from "react-native";
import PagerView from "react-native-pager-view";
import { useTranslation } from "react-i18next";
import {
  CommonActions,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { createUserQuestionnaires } from "api/user_questionnaire";
import { toggleScreen } from "store/actions";
import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";
import { Images } from "assets/images";
import Flex from "components/Flex";
import { RootStackParamList } from "navigation/types";
import { ScrollView, Pressable } from "react-native-gesture-handler";

const Questionnaire = memo(() => {
  const reduxDispatch = useDispatch();
  const { dispatch, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(["auth", "common", "success"]);
  const styles = useStyleSheet(themedStyles);
  const pagerRef = useRef<any>(null);
  const route = useRoute();
  const { questionnaire }: any = route.params;
  const { id, attributes } = questionnaire;
  const [choices, setChoices] = useState<any>([]);
  const [selected, setSelected] = useState<any>(undefined);
  const [lastAnswer, setLastAnswer] = useState<any>();
  const [wrongAnswer, setWrongAnswer] = useState<any>(false);
  const [showWrongFeedback, setShowWrongFeedback] = useState<boolean>(false);

  useEffect(() => {
    setChoices(shuffle(attributes.answers));
  }, []);

  const onPrev = () => {
    dispatch(
      CommonActions.reset({
        routes: [{ name: "MainBottomTab" }],
      })
    );
  };

  const postAnswer = async () => {
    reduxDispatch(toggleScreen(true));

    const response = await createUserQuestionnaires(id, selected);

    try {
      console.log("RESPONSE", JSON.stringify(response, null, 2));

      if (response.status === "wrong_answer") {
        setWrongAnswer(true);
        setShowWrongFeedback(true);
        setLastAnswer(selected);
        setSelected(undefined); // Clear selection to allow re-selection
      } else if (response.message) {
        Toast.show({
          type: "error",
          text1: response.message,
          text2: "Cari QR yang lainnya yuk!",
        });
        onPrev();
      } else {
        // Reset wrong answer state on success
        setWrongAnswer(false);
        setShowWrongFeedback(false);
        navigate("SuccessScr", {
          successScr: {
            title: t("success:title"),
            description: t("success:questionnaire_success"),
            actions: [
              {
                title: t("success:home_button"),
                onPress: () =>
                  dispatch(
                    CommonActions.reset({
                      routes: [{ name: "MainBottomTab" }],
                    })
                  ),
                status: "basic",
              },
            ],
            buttonsViewStyle: { alignSelf: "center" },
          },
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Jawaban sedang ditinjau",
        text2: "Coba beberapa saat lagi!",
      });
      onPrev();
    }

    reduxDispatch(toggleScreen(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Images.pageBackground}
        style={styles.container}
        resizeMode="cover"
      >
        <PagerView
          ref={pagerRef}
          style={styles.viewPager}
          initialPage={0}
          scrollEnabled={false}
        >
          <View>
            <Flex style={styles.wrapper} justify="space-between" vertical>
              <Flex
                pv={24}
                style={[
                  styles.question,
                  {
                    backgroundColor: "#EE157F",
                  },
                ]}
                vertical
                justify="space-between"
              >
                <Text style={styles.text} category="h8-s">
                  Pilih 1 jawaban yang cocok menurutmu!
                </Text>
                <Text style={styles.text} category="h2">
                  {attributes.question}
                </Text>
              </Flex>
              {showWrongFeedback && (
                <>
                  <View style={styles.wrongAnswerFeedback}>
                    <Text style={styles.wrongAnswerText} category="h6">
                      Jawaban kamu belum tepat!
                    </Text>
                    <Text style={styles.wrongAnswerText} category="h8">
                      Eits tapi tenang, kamu bisa cari QR yang lainnya!
                    </Text>
                    <Text style={styles.lastAnswerText} category="h8">
                      Jawaban kamu sebelumnya:
                    </Text>
                    <Text
                      style={[styles.lastAnswerText, { marginTop: 0 }]}
                      category="h8"
                    >
                      {lastAnswer}
                    </Text>
                  </View>
                  <View style={{ height: 150 }} />
                </>
              )}
              {!wrongAnswer && (
                <ScrollView style={styles.wrapperQuestions}>
                  {choices.map((choice: string) => (
                    <Pressable
                      key={choice}
                      onPress={() => {
                        setSelected(choice);
                        if (showWrongFeedback) {
                          setShowWrongFeedback(false);
                        }
                      }}
                    >
                      <Flex
                        vertical
                        style={[
                          styles.option,
                          selected === choice && styles.optionSelected,
                        ]}
                      >
                        <Text
                          category="h7"
                          status={selected === choice ? "basic" : "white"}
                        >
                          {choice}
                        </Text>
                      </Flex>
                    </Pressable>
                  ))}
                  <View style={{ height: 150 }} />
                </ScrollView>
              )}
              <Flex
                justify="space-between"
                pv={24}
                padder
                style={styles.navigation}
              >
                <Button
                  onPress={onPrev}
                  status="gift"
                  style={globalStyle.shadow}
                >
                  <Text>Ke Beranda</Text>
                </Button>
                {selected !== undefined && (
                  <Button
                    onPress={postAnswer}
                    status="info"
                    style={globalStyle.shadow}
                  >
                    <Text>{wrongAnswer ? "Coba Lagi" : "Jawab"}</Text>
                  </Button>
                )}
              </Flex>
            </Flex>
          </View>
        </PagerView>
      </ImageBackground>
    </View>
  );
});

export default Questionnaire;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  wrapper: {
    height: "100%",
  },
  question: {
    paddingHorizontal: 24,
    paddingTop: 64,
    borderBottomWidth: 8,
    borderBottomColor: "rgba(0, 0, 0, 0.25)",
  },
  text: {
    color: "color-basic-100",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    lineHeight: 26,
  },
  love: {
    height: 50,
    width: 50,
    marginTop: -10,
    marginBottom: -10,
  },
  wrapperQuestions: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  option: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
    ...globalStyle.shadow,
  },
  optionSelected: {
    backgroundColor: "color-basic-100",
  },
  navigation: {
    width: "100%",
    position: "absolute",
    bottom: 24,
  },
  wrongAnswerFeedback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(238, 21, 127, 0.9)",
    padding: 24,
    margin: 24,
    borderRadius: 12,
    ...globalStyle.shadow,
  },
  wrongAnswerText: {
    color: "color-basic-100",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  lastAnswerText: {
    color: "color-basic-100",
    textAlign: "center",
    marginTop: 24,
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
