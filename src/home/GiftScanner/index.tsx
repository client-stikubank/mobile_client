import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TopNavigation } from "@ui-kitten/components";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import {
  useRoute,
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { updateUserCarnivalGifts } from "store/actions";
import { Images } from "assets/images";
import LottieAnimation from "components/LottieAnimation";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/types";

const GiftScanner = () => {
  const reduxDispatch = useDispatch();
  const { navigate, goBack, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { userCarnivalGift }: any = route.params;
  const { t } = useTranslation(["auth", "common", "success"]);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handlePaid = React.useCallback(() => {
    navigate("SuccessScr", {
      successScr: {
        title: t("success:title"),
        description: t("success:gift_paid"),
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
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    if (data === userCarnivalGift?.carnival_gift_id) {
      reduxDispatch(
        updateUserCarnivalGifts(
          {
            id: userCarnivalGift?.id,
            status: "paid",
          },
          () => handlePaid()
        )
      );
    } else {
      Toast.show({
        type: "error",
        text1: "Permintaan Gagal",
        text2: "QR Code tidak sesuai!",
      });
      goBack();
    }
  };

  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <CameraView
        style={[StyleSheet.absoluteFillObject, styles.container]}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <LottieAnimation
          source={Images.qrScanner}
          autoPlay
          loop
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </CameraView>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
    </View>
  );
};

export default GiftScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
