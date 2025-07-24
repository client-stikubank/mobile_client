import React, { memo, useState, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { toUpper } from "lodash";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Controller, useForm } from "react-hook-form";
import { RulePassword, RuleConfirmPassword, RuleResetCode } from "utils/rules";
import useToggle from "hooks/useToggle";
import NavigationAction from "components/NavigationAction";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import { updatePassword } from "store/actions";
import { globalStyle } from "styles/globalStyle";

const NewPassword = memo(() => {
  const reduxDispatch = useDispatch();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { email }: any = route.params;
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common", "success"]);

  const [invisible, setInvisible] = useToggle(true);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      reset_code: "",
      password: "",
      password_confirmation: "",
    },
  });
  const [canContinue, setCanContinue] = useState(false);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (watch("password_confirmation") === watch("password")) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [watch("password_confirmation"), watch("password")]);

  useEffect(() => {
    if (
      validation === true &&
      errors.password_confirmation === undefined &&
      errors.password === undefined
    ) {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [validation, errors.password, errors.password_confirmation]);

  const handleFinish = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("success:title"),
        description: t("success:success_change_password"),
        actions: [
          {
            title: t("auth:login_button"),
            onPress: () => navigate("AuthStack", { screen: "Login" }),
            status: "basic",
          },
        ],
        buttonsViewStyle: { alignSelf: "center" },
      },
    });
  }, []);

  const onUpdatePassword = (data: any) => {
    data.reset_code = toUpper(data.reset_code);
    reduxDispatch(updatePassword(data, () => handleFinish()));
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Content padder contentContainerStyle={styles.content}>
        <Text category="h2" mb={8}>
          {t("auth:recovery_password")}
        </Text>
        <Text category="h8-s" mb={60}>
          {t("auth:recovery_password_description")}
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("auth:email").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              disabled
            />
          )}
        />
        <Controller
          control={control}
          name="reset_code"
          rules={RuleResetCode(t)}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("auth:reset_code").toString()}
              status={errors.reset_code ? "warning" : "basic"}
              style={styles.reset_code}
              value={toUpper(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.reset_code?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={RulePassword(t)}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("auth:password").toString()}
              status={errors.password ? "warning" : "basic"}
              style={styles.password}
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.password?.message}
              secureTextEntry={invisible}
              accessoryRight={(props) => (
                <TouchableWithoutFeedback onPress={setInvisible}>
                  <Ionicons
                    name={invisible ? "eye-off" : "eye"}
                    size={24}
                    color="#EE157F"
                  />
                </TouchableWithoutFeedback>
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="password_confirmation"
          rules={RuleConfirmPassword(t, watch("password"))}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("auth:password_confirmation").toString()}
              status={errors.password_confirmation ? "warning" : "basic"}
              style={styles.password_confirmation}
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.password_confirmation?.message}
              secureTextEntry={invisible}
            />
          )}
        />
        <Button
          onPress={handleSubmit(onUpdatePassword)}
          style={globalStyle.shadowBtn}
        >
          {t("auth:change_password_button").toString()}
        </Button>
      </Content>
    </Container>
  );
});

export default NewPassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 16,
  },
  email: {
    marginBottom: 24,
    borderBottomWidth: 2,
  },
  reset_code: {
    marginBottom: 24,
    borderBottomWidth: 2,
  },
  password: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  password_confirmation: {
    borderBottomWidth: 2,
    marginBottom: 32,
  },
});
