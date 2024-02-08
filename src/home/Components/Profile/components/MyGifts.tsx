import React, { memo, useEffect, useState } from "react";
import { View, Image as ImageReact } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleService,
  useStyleSheet,
  Button,
  Card,
  Modal,
} from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Images } from "assets/images";
import MonstaText from "components/MonstaText";
import Text from "components/Text";
import Flex from "components/Flex";
import LottieAnimation from "components/LottieAnimation";
import { RootStackParamList } from "navigation/types";
import {
  getUserCarnivalGifts,
  toggleModal,
  updateUserCarnivalGifts,
} from "store/actions";
import { globalStyle } from "styles/globalStyle";

interface ICarnivalGift {
  id: string;
  gift: any;
}

const MyGifts = memo(() => {
  const reduxDispatch = useDispatch();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["home"]);

  const [selectedGift, setSelectedGift] = useState<ICarnivalGift | undefined>(
    undefined
  );

  const { userCarnivalGifts, ucGiftPaginations, ucGiftParams, modal } =
    useSelector((state: any) => ({
      userCarnivalGifts: state.UserCarnivalGift.userCarnivalGifts,
      ucGiftPaginations: state.UserCarnivalGift.pagination,
      ucGiftParams: state.UserCarnivalGift.currentParams,
      modal: state.Modal.modal,
    }));

  useEffect(() => {
    reduxDispatch(getUserCarnivalGifts());
  }, []);

  const _toggleModal = (value: boolean) => {
    reduxDispatch(toggleModal(value));
  };

  const _onSelect = (user_carnival_gift: any) => {
    setSelectedGift(user_carnival_gift);
    _toggleModal(true);
  };

  const _onCancel = () => {
    setSelectedGift(undefined);
    _toggleModal(false);
  };

  const renderPagination = (index: number, total: number, context: Swiper) => {
    return (
      <Flex itemsCenter justify="center">
        <Text status="info" category="h7" mt={-100}>
          {index + 1}/{ucGiftPaginations.count}
        </Text>
      </Flex>
    );
  };

  const loadMoreGifts = (index: number) => {
    if (index >= ucGiftPaginations.count - 2 && ucGiftPaginations.next) {
      reduxDispatch(
        getUserCarnivalGifts({
          ...ucGiftParams,
          page: ucGiftPaginations.current + 1,
        })
      );
    }
  };

  const cancelConfirmed = () => {
    setSelectedGift(undefined);
    reduxDispatch(toggleModal(false));
    reduxDispatch(
      updateUserCarnivalGifts(
        {
          id: selectedGift?.id,
          status: "cancelled",
        },
        () => {}
      )
    );
  };

  return (
    <View style={styles.myGiftsContainer}>
      <Text style={styles.subTitle} category="h6" mt={24}>
        My Kado
      </Text>
      {userCarnivalGifts.length > 0 ? (
        <Flex mh={-24}>
          <Swiper
            style={styles.swiper}
            loop={false}
            renderPagination={renderPagination}
            onIndexChanged={(index) => loadMoreGifts(index)}
          >
            {userCarnivalGifts.map((carnivalGift: any) => (
              <View style={styles.giftCardWrapper} key={carnivalGift.id}>
                <View style={styles.giftCard}>
                  {carnivalGift.status === "paid" && (
                    <Flex
                      style={styles.overlayOutStock}
                      justify="center"
                      itemsCenter
                    >
                      <Ionicons
                        name="md-checkmark-circle"
                        size={48}
                        color="#00D65B"
                      />
                    </Flex>
                  )}
                  <Text
                    category="h7"
                    numberOfLines={2}
                    style={{ color: "white", height: 36 }}
                    center
                  >
                    {carnivalGift.gift.name}
                  </Text>
                  <Flex
                    style={styles.imageWrapper}
                    itemsCenter
                    justify="center"
                  >
                    {!carnivalGift.out_of_stock && (
                      <LottieAnimation
                        source={Images.giftLight}
                        autoPlay
                        loop
                        style={{ width: "100%", aspectRatio: 2 / 3 }}
                      />
                    )}
                    <ImageReact
                      source={{ uri: carnivalGift.gift.image.url }}
                      style={{ height: 150, aspectRatio: 1 }}
                      resizeMode="contain"
                    />
                  </Flex>
                  <Flex
                    style={styles.tokens}
                    justify="center"
                    itemsCenter
                    center
                  >
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenBeryl]}
                        itemsCenter
                      >
                        <Text category="h5" bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[0]}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenAle]}
                        itemsCenter
                      >
                        <Text category="h5" bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[1]}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenJenny]}
                        itemsCenter
                      >
                        <Text category="h5" bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[2]}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex style={styles.token} vertical={true}>
                      <Flex
                        style={[styles.tokenAmount, styles.tokenMamo]}
                        itemsCenter
                      >
                        <Text category="h5" bold style={styles.tokenText}>
                          {carnivalGift.gift.reward_amount[3]}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </View>
                {carnivalGift.status === "redeemed" && (
                  <Flex justify="space-between" mt={16}>
                    <Button
                      status="control"
                      size="medium"
                      style={{ width: "31.5%" }}
                      onPress={() =>
                        navigate("GiftScanner", {
                          userCarnivalGift: carnivalGift,
                        })
                      }
                    >
                      <Flex itemsCenter>
                        <Ionicons name="qr-code" size={14} color="black" />
                        <Text category="h8" ml={4}>
                          Scan
                        </Text>
                      </Flex>
                    </Button>
                    <Button
                      status="control"
                      size="medium"
                      style={{ width: "31.5%" }}
                      onPress={() => _onSelect(carnivalGift)}
                    >
                      <Flex itemsCenter>
                        <Ionicons
                          name="remove-circle-outline"
                          size={14}
                          color="black"
                        />
                        <Text category="h8" ml={4}>
                          Batal
                        </Text>
                      </Flex>
                    </Button>
                  </Flex>
                )}
              </View>
            ))}
          </Swiper>
          {selectedGift && (
            <Modal
              backdropStyle={globalStyle.backdropStyle}
              onBackdropPress={_onCancel}
              visible={modal}
            >
              <Card
                header={
                  <View>
                    <Text category="h6">{selectedGift.gift.name}</Text>
                  </View>
                }
                footer={
                  <View>
                    <Flex>
                      <Button
                        size="small"
                        status="outline"
                        style={styles.buttonModal}
                        onPress={_onCancel}
                      >
                        Gak jadi
                      </Button>
                      <Button
                        size="small"
                        style={styles.buttonModal}
                        onPress={cancelConfirmed}
                      >
                        Batalkan kado!
                      </Button>
                    </Flex>
                  </View>
                }
              >
                <Flex vertical alignItems="center" justify="center" mb={16}>
                  <Text category="h8" mb={2}>
                    MONSTA yang akan dikembalikan:
                  </Text>
                  <MonstaText
                    amount={selectedGift.gift?.reward_amount?.join("")}
                    category="h8"
                    radius={11}
                  />
                </Flex>
                <Text category="h8-s" center>
                  Apakah kamu yakin ingin membatalkan kado ini?
                </Text>
              </Card>
            </Modal>
          )}
        </Flex>
      ) : (
        <Text mb={16}>Kamu belum memiliki satupun kado 🙁</Text>
      )}
    </View>
  );
});

export default MyGifts;

const themedStyles = StyleService.create({
  myGiftsContainer: {},
  subTitle: {
    marginBottom: 8,
  },
  swiper: {
    height: 400,
    paddingBottom: 16,
  },
  paginationText: {
    color: "white",
    fontSize: 20,
  },
  giftCardWrapper: {
    paddingHorizontal: 24,
    ...globalStyle.shadow,
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
    // height: 48,
    aspectRatio: 2,
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
  buttonModal: {
    marginHorizontal: 8,
  },
});
