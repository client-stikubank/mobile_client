import React, { memo, useCallback } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import { Images } from "assets/images";
import Flex from "components/Flex";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { RootStackParamList } from "navigation/types";
import { logoutUser } from "store/actions";

import ButtonOptional from "./Components/ButtonOptional";
import HeaderMoreOption from "./Components/HeaderMoreOption";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreSrc = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(["more"]);
  const reduxDispatch = useDispatch();

  const auth = useSelector((state: any) => state.Login.auth);
  const userProfile = useSelector(
    (state: any) => state.UserProfile.userProfile
  );

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

  const onLogout = () => {
    AsyncStorage.removeItem("credential");
    reduxDispatch(logoutUser(auth, () => nextScreen("AuthStack")));
  };

  return (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <HeaderMoreOption
          name={userProfile?.user_profile.full_name}
          avatar={Images.tokenMamo}
          email={userProfile.email}
        />
        <View style={styles.details}>
          <Text category="h6" bold>
            {t("more:account")}
          </Text>
          <Flex vertical>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigate("EditAccount")}
            >
              <Text category="h7-s">{t("more:account_detail_link")}</Text>
            </TouchableOpacity>
          </Flex>
        </View>
        <View style={styles.application}>
          <ButtonOptional
            title={t("more:logout_button")}
            icon={"changeJob"}
            status={"danger"}
            onPress={onLogout}
            navigateSrc={undefined}
          />
        </View>
      </Content>
    </Container>
  );
});

export default MoreSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80,
  },

  details: {
    marginBottom: 48,
  },
  application: {},
  link: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "color-basic-400",
  },
});
