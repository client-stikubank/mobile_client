import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TopNavigation } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
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

import { getQrClue } from "api/qr_clue";
import { toggleScreen } from "store/actions";
import { Images } from "assets/images";
import LottieAnimation from "components/LottieAnimation";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/types";

const QrclueScanner = () => {
  const reduxDispatch = useDispatch();
  const { navigate, goBack, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(["auth", "common", "success"]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleUsed = React.useCallback((clue: any) => {
    navigate("SuccessScr", {
      successScr: {
        title: "Petunjuk / Clue",
        description: clue.clue,
        logo: clue.image.url || Images.qrclueIcon,
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

  const checkQr = async (id: string) => {
    reduxDispatch(toggleScreen(true));

    try {
      const response = await getQrClue(id);
      handleUsed(response.data.attributes);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Tidak ada Petunjuk / Clue disini!",
        text2: "QR tidak sesuai!",
      });
      goBack();
    }

    reduxDispatch(toggleScreen(false));
  };

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    checkQr(data);
  };

  if (!permission) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No access to camera</Text>
        <Button onPress={requestPermission}>Request Access</Button>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <LottieAnimation
          source={Images.qrScanner}
          autoPlay
          loop
          resizeMode="contain"
        />
      </Camera>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
    </View>
  );
};

export default QrclueScanner;

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
