import React, { memo, useCallback, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  TopNavigation,
  StyleService,
  useTheme,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";

import { Images } from "assets/images";
import Container from "components/Container";
import Content from "components/Content";
import NavigationAction from "components/NavigationAction";
import Text from "components/Text";
import useLayout from "hooks/useLayout";
import { AuthStackParamList } from "navigation/types";
import { collectRegister } from "store/actions";
import { globalStyle } from "styles/globalStyle";

const SignupFirstStep = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { t } = useTranslation(["auth"]);
  const { width } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const reduxDispatch = useDispatch();
  const ROLES = [
    { name: "student", title: t("auth:student"), icon: "student" },
    // { name: 'guardian', title: t('auth:parent'), icon: 'parent' },
    // { name: 'teacher', title: t('auth:teacher'), icon: 'teacher' }
  ];
  const sizeBG = 120 * (width / 375);
  const [isChoose, setChoose] = useState({ name: "" });
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useSelector((state: any) => state.Register.form);

  const onChoose = useCallback(
    (item) => () => {
      setChoose(item);
      setIsDisabled(true);
      reduxDispatch(collectRegister({ ...form, "role_types[]": item.name }));
      setTimeout(() => {
        navigate("SignupSecondStep");
      }, 500);
      setTimeout(() => {
        setIsDisabled(false);
      }, 550);
      clearTimeout;
    },
    []
  );

  return (
    <Container>
      <TopNavigation
        title={t("auth:sign_up")}
        accessoryLeft={<NavigationAction />}
      />
      <Content padder>
        <Text mt={16}>{t("auth:signup_1")}</Text>
        <Text mt={8} mb={32} category="h2">
          {t("auth:signup_1_description")}
        </Text>
        <View style={styles.content}>
          {ROLES.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  width: sizeBG + 28,
                  marginLeft: (i + 1) % 2 === 0 ? 24 : 0,
                  marginBottom: 24,
                  alignItems: "center",
                }}
                disabled={isDisabled}
                onPress={onChoose(item)}
                activeOpacity={0.4}
              >
                <View
                  style={[
                    isChoose?.name === item.name
                      ? globalStyle.shadowBtn
                      : undefined,
                  ]}
                >
                  <ImageBackground
                    source={
                      isChoose?.name === item.name
                        ? Images.fillActive
                        : Images.fill
                    }
                    style={{
                      width: sizeBG,
                      height: sizeBG,
                      ...globalStyle.center,
                    }}
                    imageStyle={{ width: sizeBG, height: sizeBG }}
                  >
                    <Icon
                      pack="assets"
                      name={item.icon}
                      style={{
                        width: 52,
                        height: 52,
                        tintColor:
                          isChoose?.name === item.name
                            ? theme["text-primary-color"]
                            : theme["text-placeholder-color"],
                        zIndex: 10,
                        alignSelf: "center",
                      }}
                    />
                  </ImageBackground>
                </View>
                <Text
                  center
                  category="h8"
                  mt={16}
                  status={isChoose?.name === item.name ? "link" : "placeholder"}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Content>
    </Container>
  );
});
export default SignupFirstStep;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
