import React, { memo, useCallback } from "react";
import { Platform, View, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Layout,
  Button,
  Modal,
  Card,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import useToggle from "hooks/useToggle";
import { HomeStackParamList } from "navigation/types";
import { deleteAccount, updateNewPassword } from "store/actions";
import { RuleEmail, RulePassword, RuleConfirmPassword } from "utils/rules";
import { globalStyle } from "styles/globalStyle";
import Flex from "components/Flex";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditAccount = memo(() => {
  const { navigate, dispatch } =
    useNavigation<NavigationProp<HomeStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth"]);
  const reduxDispatch = useDispatch();

  const [invisible, setInvisible] = useToggle(true);
  const [deleteModal, setDeleteModal] = useToggle(false);

  const { userProfile } = useSelector((state: any) => ({
    userProfile: state.UserProfile.userProfile,
  }));

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userProfile.email,
      password: "",
      password_confirmation: "",
    },
  });

  const handleSignup = useCallback((data) => {
    reduxDispatch(
      updateNewPassword({
        user: data,
      })
    );
    navigate("HomeSrc");
  }, []);

  const handleDelete = useCallback((data) => {
    reduxDispatch(
      updateNewPassword({
        user: data,
      })
    );
    navigate("HomeSrc");
  }, []);

  const nextScreen = useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={Platform.OS === "android" ? 14 : 32}
        extraScrollHeight={Platform.OS === "android" ? 14 : 32}
        scrollEnabled={true}
        enableAutomaticScroll={true}
      >
        <View>
          <Content padder>
            <Text mt={8} mb={48} category="h2">
              {t("auth:edit_account")}
            </Text>

            <Controller
              control={control}
              name="email"
              rules={RuleEmail(t)}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t("auth:email").toString()}
                  status={errors.email ? "warning" : "basic"}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  disabled
                  /* @ts-ignore */
                  caption={errors.email?.message}
                />
              )}
            />
            <Text category="h6" mb={16} bold>
              {t("auth:change_password")}
            </Text>
            <Controller
              control={control}
              name="password"
              rules={RulePassword(t)}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t("auth:password_new").toString()}
                  status={errors.password ? "warning" : "basic"}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="default"
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
                  label={t("auth:password_confirmation_new").toString()}
                  status={errors.password_confirmation ? "warning" : "basic"}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="default"
                  caption={errors.password_confirmation?.message}
                  secureTextEntry={invisible}
                />
              )}
            />
          </Content>

          <Layout style={styles.bottom}>
            <Button
              children={t("auth:save_account_button")}
              onPress={handleSubmit(handleSignup)}
            />
          </Layout>
          <Layout style={styles.bottom}>
            <Button
              status="danger"
              appearance="ghost"
              children={t("auth:delete_account_button")}
              onPress={setDeleteModal}
            />
          </Layout>
        </View>
      </KeyboardAwareScrollView>
      <Modal
        backdropStyle={globalStyle.backdropStyle}
        onBackdropPress={setDeleteModal}
        visible={deleteModal}
      >
        <Card
          header={
            <View>
              <Text category="h6">{t("auth:delete_account_button")}</Text>
            </View>
          }
          footer={
            <View>
              <Flex>
                <Button
                  size="small"
                  status="outline"
                  style={styles.buttonModal}
                  onPress={() => {
                    setDeleteModal();
                    reduxDispatch(
                      deleteAccount({}, () => {
                        AsyncStorage.removeItem("credential");
                        nextScreen("AuthStack");
                      })
                    );
                  }}
                >
                  Ya, hapus
                </Button>
                <Button
                  size="small"
                  style={styles.buttonModal}
                  onPress={setDeleteModal}
                >
                  Jangan hapus!
                </Button>
              </Flex>
            </View>
          }
        >
          <Flex vertical alignItems="center" justify="center" mb={16}>
            <Text category="h8" mb={2}>
              Akun kamu akan dihapus oleh system!
            </Text>
          </Flex>
          <Text category="h8-s" center>
            Apakah kamu yakin ingin menghapus akun ini?
          </Text>
        </Card>
      </Modal>
    </Container>
  );
});

export default EditAccount;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  datepicker: {
    marginBottom: 24,
  },
  bottom: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingBottom: 24,
  },
  buttonModal: {
    marginHorizontal: 8,
  },
});
