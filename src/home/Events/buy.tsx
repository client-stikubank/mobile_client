import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, every } from "lodash";

import { createUserEvents, homeDisplay } from "store/actions";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Flex from "components/Flex";
import { transpose } from "helpers/response";
import { globalStyle } from "styles/globalStyle";
import { navigate } from "navigation/RootNavigation";

const BuyEvent = memo(() => {
  const reduxDispatch = useDispatch();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["home", "request", "common"]);
  const route = useRoute();
  const { event }: any = route.params;
  const opacity = useSharedValue(0.15);

  const userProfile = useSelector(
    (state: any) => state.UserProfile.userProfile
  );

  opacity.value = withRepeat(
    withTiming(1, { duration: 500, easing: Easing.ease }),
    -1,
    true
  );

  const blinkStyle = useAnimatedStyle(() => ({ opacity: opacity.value }), []);

  const onRedeem = () => {
    reduxDispatch(createUserEvents(event.id, () => navigate("MainBottomTab")));
    reduxDispatch(homeDisplay("carnival"));
  };

  const remainingBalance: any = () => {
    if (userProfile.wallet_balance && event.reward_amount) {
      return transpose(userProfile.wallet_balance, event.reward_amount);
    } else {
      return [0, 0, 0, 0];
    }
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("home:buy_event").toString()}
        accessoryLeft={() => <NavigationAction />}
      />
      <Content padder contentContainerStyle={styles.content}>
        <View style={styles.contact}>
          <Text category="h7" mt={24} mb={8} bold status="link">
            Petunjuk Pembelian!
          </Text>
          <Text category="h8-s" mb={8}>
            1. Tiket yang sudah dibeli tidak dapat dikembalikan.
          </Text>
          <Text category="h8-s" mb={8}>
            2. Jika terjadi pembatalan acara, maka Monsta akan dikembalikan
            sesuai dengan harga tiket.
          </Text>
          <Text category="h8-s" mb={8}>
            3. Penyelenggara memiliki hak untuk mengubah ataupun menambahkan
            syarat-syarat di syarat & ketentuan tanpa pemberitahuan lebih
            dahulu.
          </Text>
          <Text category="h8-s">
            Kamu dapat melihat tiket yang sudah dibeli di halaman Profil kamu
            pada bagian "My Events"
          </Text>
          <Text category="h6" bold mt={32}>
            {event.title}
          </Text>
          <Flex itemsCenter justify="space-between" mt={16} mr={16}>
            <Text category="h7" status="info">
              MONSTA saat ini
            </Text>
            <Flex style={styles.tokens} justify="center" itemsCenter center>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenBeryl]}
                  itemsCenter
                >
                  <Text category="h6" bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[0]
                      : "-"}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex style={[styles.tokenAmount, styles.tokenAle]} itemsCenter>
                  <Text category="h6" bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[1]
                      : "-"}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenJenny]}
                  itemsCenter
                >
                  <Text category="h6" bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[2]
                      : "-"}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenMamo]}
                  itemsCenter
                >
                  <Text category="h6" bold style={styles.tokenText}>
                    {!isEmpty(userProfile)
                      ? userProfile.wallet_balance[3]
                      : "-"}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex itemsCenter justify="space-between" mt={8} mr={16}>
            <Text category="h7" status="danger">
              Harga Tiket
            </Text>
            <Flex style={styles.tokens} justify="center" itemsCenter center>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenBeryl]}
                  itemsCenter
                >
                  <Text category="h6" bold style={styles.tokenText}>
                    {event.reward_amount[0]}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex style={[styles.tokenAmount, styles.tokenAle]} itemsCenter>
                  <Text category="h6" bold style={styles.tokenText}>
                    {event.reward_amount[1]}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenJenny]}
                  itemsCenter
                >
                  <Text category="h6" bold style={styles.tokenText}>
                    {event.reward_amount[2]}
                  </Text>
                </Flex>
              </Flex>
              <Flex style={styles.token} vertical={true}>
                <Flex
                  style={[styles.tokenAmount, styles.tokenMamo]}
                  itemsCenter
                >
                  <Text category="h6" bold style={styles.tokenText}>
                    {event.reward_amount[3]}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex style={styles.deductLine} justify="flex-end">
            <Text bold category="h6" status="danger" mr={-8}>
              —
            </Text>
          </Flex>
          <Animated.View style={blinkStyle}>
            <Flex itemsCenter justify="space-between" mt={16} mr={16}>
              <Text category="h7">Sisa MONSTA kamu</Text>
              <Flex style={styles.tokens} justify="center" itemsCenter center>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenBeryl]}
                    itemsCenter
                  >
                    <Text category="h6" bold style={styles.tokenText}>
                      {remainingBalance()[0]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenAle]}
                    itemsCenter
                  >
                    <Text category="h6" bold style={styles.tokenText}>
                      {remainingBalance()[1]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenJenny]}
                    itemsCenter
                  >
                    <Text category="h6" bold style={styles.tokenText}>
                      {remainingBalance()[2]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex style={styles.token} vertical={true}>
                  <Flex
                    style={[styles.tokenAmount, styles.tokenMamo]}
                    itemsCenter
                  >
                    <Text category="h6" bold style={styles.tokenText}>
                      {remainingBalance()[3]}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Animated.View>
        </View>
      </Content>
      <Flex
        level="2"
        style={styles.bottom}
        padder
        pb={bottom + 8}
        itemsCenter
        justify="center"
      >
        {every(remainingBalance(), (value) => value >= 0) ? (
          <Button
            children={"Bayar Tiket"}
            style={globalStyle.flexOne}
            status="gift"
            onPress={onRedeem}
          />
        ) : (
          <Text category="h5" bold status="danger">
            MONSTA tidak cukup
          </Text>
        )}
      </Flex>
    </Container>
  );
});

export default BuyEvent;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 140,
  },
  personal: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 40,
  },
  cancelInterview: {
    alignSelf: "center",
    marginBottom: 40,
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  contact: {
    marginBottom: 40,
  },
  iconCalendar: {
    ...globalStyle.icon16,
    tintColor: "text-placeholder-color",
    marginRight: 8,
  },
  details: {
    marginVertical: 40,
  },
  additional: {
    marginBottom: 40,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.shadowFade,
    paddingTop: 14,
  },
  deductLine: {
    borderBottomWidth: 1,
    borderBottomColor: "color-basic-700",
    marginTop: -8,
  },
  tokens: {},
  token: {},
  tokenMamo: {
    backgroundColor: "color-mamo",
    paddingHorizontal: 6,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  tokenAle: {
    backgroundColor: "color-ale",
    paddingHorizontal: 6,
  },
  tokenBeryl: {
    backgroundColor: "color-beryl",
    paddingHorizontal: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  tokenJenny: {
    backgroundColor: "color-jenny",
    paddingHorizontal: 6,
  },
  tokenAmount: {
    width: 30,
    height: 30,
    ...globalStyle.center,
  },
  tokenText: {
    color: "#FFF",
  },
});
