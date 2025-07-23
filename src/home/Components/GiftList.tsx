import React, { memo, useEffect } from "react";
import { View, Platform, Image as ImageReact } from "react-native";
import Image from "react-native-scalable-image";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { isEmpty } from "lodash";

import { getCarnivalGifts } from "store/actions";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Flex from "components/Flex";
import Content from "components/Content";
import LottieAnimation from "components/LottieAnimation";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/types";
import { getStage, getCarnival } from "store/actions";
import { globalStyle } from "styles/globalStyle";

import ActiveCamp from "./ActiveCamp";

const GiftList = memo(() => {
  const reduxDispatch = useDispatch();
  const theme = useTheme();
  const { width } = useLayout();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["home", "common"]);

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const carnivalGifts = useSelector(
    (state: any) => state.CarnivalGift.carnivalGifts
  );

  useEffect(() => {
    reduxDispatch(
      getCarnivalGifts({
        query: {
          status_eq: 1,
        },
      })
    );
  }, []);

  const _onRedeemGift = (gift: any) => {
    navigate("RedeemGift", { carnivalGift: gift });
  };

  return isEmpty(carnival) ? null : (
    <Content style={styles.giftContainer}>
      <Flex style={styles.giftHeader} itemsCenter justify="center">
        <Flex justify="center" itemsCenter style={styles.giftAnimated}>
          <LottieAnimation
            source={Images.giftTitle}
            autoPlay
            loop
            style={{ width: "100%", aspectRatio: 1 }}
          />
        </Flex>
        <View style={styles.giftHeaderImage}>
          <Image source={Images.giftHeader} width={width - 160} />
        </View>
      </Flex>
      <Text category="h8-s" mt={16} mb={16}>
        Pilih kado yang kamu sukai. Pastikan MONSTA-mu cukup untuk ditukarkan!
      </Text>
      {carnivalGifts.length > 0 && (
        <Flex wrap mh={-8}>
          {carnivalGifts.map((carnivalGift: any) => (
            <View style={styles.giftCardWrapper} key={carnivalGift.id}>
              <View style={styles.giftCard}>
                {carnivalGift.out_of_stock && (
                  <Flex
                    style={styles.overlayOutStock}
                    justify="center"
                    itemsCenter
                  >
                    <Text status="white" category="h6">
                      Kado Habis!
                    </Text>
                  </Flex>
                )}
                <Text
                  category="h8"
                  numberOfLines={2}
                  style={{ color: "white", height: 36 }}
                >
                  {carnivalGift.gift.name}
                </Text>
                <Flex style={styles.imageWrapper} itemsCenter justify="center">
                  <View
                    style={{
                      position: "relative",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!carnivalGift.out_of_stock && (
                      <LottieAnimation
                        source={Images.giftLight}
                        autoPlay
                        loop
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: 150, // match the image height
                          aspectRatio: 2 / 3,
                          zIndex: 0,
                        }}
                      />
                    )}
                    <ImageReact
                      source={{ uri: carnivalGift.gift.image.url }}
                      style={{ height: 150, aspectRatio: 1, zIndex: 1 }}
                      resizeMode="contain"
                    />
                  </View>
                </Flex>
                <Button
                  style={
                    carnivalGift.out_of_stock
                      ? { ...styles.bookGift, opacity: 0 }
                      : styles.bookGift
                  }
                  size="small"
                  status="gift"
                  onPress={() => _onRedeemGift(carnivalGift)}
                >
                  Redeem
                </Button>
                <Flex style={styles.tokens} justify="center" itemsCenter center>
                  <Flex style={styles.token} vertical={true}>
                    <Flex
                      style={[styles.tokenAmount, styles.tokenBeryl]}
                      itemsCenter
                    >
                      <Text category="h6" bold style={styles.tokenText}>
                        {carnivalGift.gift.reward_amount[0]}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex style={styles.token} vertical={true}>
                    <Flex
                      style={[styles.tokenAmount, styles.tokenAle]}
                      itemsCenter
                    >
                      <Text category="h6" bold style={styles.tokenText}>
                        {carnivalGift.gift.reward_amount[1]}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex style={styles.token} vertical={true}>
                    <Flex
                      style={[styles.tokenAmount, styles.tokenJenny]}
                      itemsCenter
                    >
                      <Text category="h6" bold style={styles.tokenText}>
                        {carnivalGift.gift.reward_amount[2]}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex style={styles.token} vertical={true}>
                    <Flex
                      style={[styles.tokenAmount, styles.tokenMamo]}
                      itemsCenter
                    >
                      <Text category="h6" bold style={styles.tokenText}>
                        {carnivalGift.gift.reward_amount[3]}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </View>
            </View>
          ))}
        </Flex>
      )}
    </Content>
  );
});

export default GiftList;

const themedStyles = StyleService.create({
  giftContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "color-basic-100",
  },
  giftHeader: {
    position: "relative",
  },
  giftHeaderImage: {
    marginTop: 8,
  },
  giftAnimated: {
    width: 100,
    aspectRatio: 1,
  },
  giftCardWrapper: {
    padding: 8,
    width: "50%",
  },
  giftCard: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: "color-success-200",
    position: "relative",
    overflow: "hidden",
  },
  imageWrapper: {
    height: 260,
    marginTop: -35,
    marginBottom: -25,
    overflow: "visible",
  },
  bookGift: {
    backgroundColor: "color-mamo",
    borderColor: "color-mamo",
    textAlign: "center",
  },
  tokens: {
    overflow: "hidden",
    marginHorizontal: -12,
    marginBottom: -12,
    marginTop: 16,
  },
  token: {
    width: "25%",
  },
  tokenMamo: {
    backgroundColor: "color-mamo",
    paddingHorizontal: 6,
    borderBottomRightRadius: 15,
  },
  tokenAle: {
    backgroundColor: "color-ale",
    paddingHorizontal: 6,
  },
  tokenBeryl: {
    backgroundColor: "color-beryl",
    paddingHorizontal: 6,
    borderBottomLeftRadius: 15,
  },
  tokenJenny: {
    backgroundColor: "color-jenny",
    paddingHorizontal: 6,
  },
  tokenAmount: {
    height: 32,
    ...globalStyle.center,
  },
  tokenText: {
    color: "#FFF",
  },
  overlayOutStock: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "115%",
    height: "109%",
    backgroundColor: "rgba(29, 30, 44, 0.8)",
    zIndex: 1,
  },
});
