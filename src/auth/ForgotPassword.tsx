import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Controller, useForm } from "react-hook-form";
import { RuleEmail } from "utils/rules";
import { AuthStackParamList } from "navigation/types";
import { resetPassword } from "store/actions";
import { globalStyle } from "styles/globalStyle";

const ForgotPassword = memo(() => {
  const reduxDispatch = useDispatch();
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth"]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onResetPassword = (data: any) => {
    reduxDispatch(
      resetPassword(data, () => navigate("NewPassword", { email: data.email }))
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />

      <Content padder contentContainerStyle={styles.content}>
        <Text category="h2" mb={8}>
          {t("auth:forgot_password")}
        </Text>
        <Text category="para-m" mb={48}>
          {t("auth:forgot_password_description")}
        </Text>
        <Controller
          control={control}
          name="email"
          rules={RuleEmail(t)}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t("auth:email").toString()}
              status={errors.email ? "warning" : "basic"}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Button
          children={t("auth:send_code_reset").toString()}
          onPress={handleSubmit(onResetPassword)}
          style={globalStyle.shadowBtn}
        />
      </Content>
    </Container>
  );
});

export default ForgotPassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 16,
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 32,
  },
});
