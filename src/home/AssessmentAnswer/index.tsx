import React, { memo, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { ImageBackground, View, BackHandler } from "react-native";
import PagerView from "react-native-pager-view";
import {
  CommonActions,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";

import {
  updateAssessmentAnswer,
  updateAssessments,
  getCarnivalSuccess,
  createAssessmentsSuccess,
  getCarnival,
} from "store/actions";
import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";
import { Images } from "assets/images";
import Flex from "components/Flex";
import { RootStackParamList } from "navigation/types";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const AssessmentAnswer = memo(() => {
  const reduxDispatch = useDispatch();
  const { dispatch, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const pagerRef = useRef<any>(null);
  const route = useRoute();
  const { isContinue }: any = route.params;
  const [selected, setSelected] = useState([]);
  const [lastAnswer, setLastAnswer] = useState<any>();
  const headerColors = ["#FFC40C", "#2EB4AC", "#96519B", "#EE157F"];

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const assessment = useSelector((state: any) => state.Assessment.assessment);
  const lastSubmitAt = useSelector(
    (state: any) => state.AssessmentAnswer.lastSubmitAt
  );
  const assessmentAnswer = useSelector(
    (state: any) => state.AssessmentAnswer.assessmentAnswer
  );

  const assessmentAnswers = isContinue
    ? carnival?.pending_assessment?.assessment_answers
    : assessment?.assessment_answers;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setSelected(assessmentAnswers.map((answer: any) => answer.answer));
  }, [assessmentAnswers]);

  useEffect(() => {
    if (!isEmpty(assessmentAnswer) && lastAnswer) {
      pagerRef.current.setPage(lastAnswer.index_order);
    }
  }, [lastSubmitAt]);

  useEffect(() => {
    if (!isEmpty(assessmentAnswer)) {
      getCarnivalSuccess({
        ...carnival,
        current_assessment_index: assessmentAnswer.index_order + 1,
        pending_assessment: {
          ...carnival.pending_assessment,
          assessment_answers: assessmentAnswers.map((answer: any) => {
            return answer.id === assessmentAnswer.id
              ? assessmentAnswer
              : answer;
          }),
        },
      });
      !isContinue &&
        reduxDispatch(
          createAssessmentsSuccess({
            ...assessment,
            assessment_answers: assessmentAnswers.map((answer: any) => {
              return answer.id === assessmentAnswer.id
                ? assessmentAnswer
                : answer;
            }),
          })
        );
    }
  }, [assessmentAnswer]);

  const selectAnswer = (answer: any, choice: number) => {
    const choiceChar = choice === 1 ? "one" : "two";

    if (selected[answer.index_order - 1] === choiceChar) {
      pagerRef.current.setPage(answer.index_order);
    } else {
      const updateSelected: any = [...selected];
      updateSelected[answer.index_order - 1] = choiceChar;
      setSelected(updateSelected);
      setLastAnswer(answer);

      reduxDispatch(updateAssessmentAnswer(answer, choice));
    }
  };

  const showResults = () => {
    reduxDispatch(
      updateAssessments(
        isContinue ? carnival?.pending_assessment : assessment,
        {
          status: "completed",
          completed_at: new Date(),
        },
        () => {
          navigate("AssessmentDetail", { firstTime: true });
          reduxDispatch(getCarnival());
        }
      )
    );
  };

  const onPrev = (page: number) => {
    if (page >= 0) {
      pagerRef.current.setPage(page);
    } else {
      dispatch(
        CommonActions.reset({
          routes: [{ name: "MainBottomTab" }],
        })
      );
    }
  };

  const onNext = (page: number) => {
    pagerRef.current.setPage(page);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Images.pageBackground}
        style={styles.container}
        resizeMode="cover"
      >
        {assessmentAnswers.length > 0 && (
          <PagerView
            ref={pagerRef}
            style={styles.viewPager}
            initialPage={
              isContinue ? carnival?.current_assessment_index - 1 : 0
            }
            scrollEnabled={false}
          >
            {assessmentAnswers.map((answer: any, index: number) => (
              <View key={answer.index_order}>
                <Flex style={styles.wrapper} justify="space-between" vertical>
                  <Flex
                    pv={24}
                    style={[
                      styles.question,
                      {
                        backgroundColor: headerColors[answer.index_order % 4],
                      },
                    ]}
                    vertical
                    justify="space-between"
                  >
                    <Text style={styles.text} category="h7">
                      Pertanyaan {answer.index_order}
                    </Text>
                    <Text style={styles.text} category="h2">
                      {answer.assessment_question.question}
                    </Text>
                  </Flex>
                  <ScrollView style={styles.wrapperQuestions}>
                    {["one", "two"].map((choice: string) => (
                      <TouchableWithoutFeedback
                        key={choice}
                        onPress={() =>
                          selectAnswer(answer, choice === "one" ? 1 : 2)
                        }
                      >
                        <Flex
                          vertical
                          style={[
                            styles.option,
                            selected[index] === choice && styles.optionSelected,
                          ]}
                        >
                          <Text
                            category="h7"
                            status={
                              selected[index] === choice ? "white" : "basic"
                            }
                          >
                            {
                              answer.assessment_question[
                                `choice_${choice === "one" ? 1 : 2}_text`
                              ]
                            }
                          </Text>
                        </Flex>
                      </TouchableWithoutFeedback>
                    ))}
                    <View style={{ height: 150 }} />
                  </ScrollView>
                  <Flex
                    justify="space-between"
                    pv={24}
                    padder
                    style={styles.navigation}
                  >
                    <Button
                      onPress={() => onPrev(index - 1)}
                      status="gift"
                      style={{ ...globalStyle.shadow }}
                    >
                      {index > 0 ? "Pertanyaan Sebelumnya" : "Ke Beranda"}
                    </Button>
                    {selected[index] && (
                      <Button
                        onPress={() => onNext(index + 1)}
                        status="gift"
                        style={{ ...globalStyle.shadow }}
                      >
                        {">"}
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </View>
            ))}
            <Flex
              itemsCenter
              justify="center"
              vertical
              style={[styles.wrapperQuestions, { paddingTop: 0 }]}
            >
              <Text category="h5" status="white" mb={8} center>
                Hebat! Kamu berhasil menjawab semua pertanyaan yang diberikan.
              </Text>
              <Text category="h7" status="white" center>
                Waktunya lihat hasil Tes Kepribadian Kamu Yuk!
              </Text>
              <Flex mt={32} vertical>
                <Button
                  onPress={showResults}
                  style={{ ...globalStyle.shadow }}
                  status="control"
                >
                  Lihat Hasil
                </Button>
                <Button
                  onPress={() => onPrev(assessmentAnswers.length - 1)}
                  status="gift"
                  style={{ ...globalStyle.shadow, marginTop: 64 }}
                  size="small"
                >
                  Pertanyaan Sebelumnya
                </Button>
              </Flex>
            </Flex>
          </PagerView>
        )}
      </ImageBackground>
    </View>
  );
});

export default AssessmentAnswer;

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
    backgroundColor: "color-basic-100",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
    ...globalStyle.shadow,
  },
  optionSelected: {
    backgroundColor: "color-primary-200",
    ...globalStyle.shadowBtn,
  },
  navigation: {
    width: "100%",
    position: "absolute",
    bottom: 24,
  },
});
