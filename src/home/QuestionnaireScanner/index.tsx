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

import { getQuestionnaire } from "api/questionnaires";
import { toggleScreen } from "store/actions";
import { Images } from "assets/images";
import LottieAnimation from "components/LottieAnimation";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/types";

const QuestionnaireScanner = () => {
  const reduxDispatch = useDispatch();
  const { navigate, goBack, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(["auth", "common", "success"]);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleUsed = React.useCallback((data: any) => {
    navigate("Questionnaire", {
      questionnaire: data,
    });
    // navigate("SuccessScr", {
    //   successScr: {
    //     title: "Petunjuk / Clue",
    //     description: clue.question,
    //     logo: Images.questionnaireIcon,
    //     actions: [
    //       {
    //         title: t("success:home_button"),
    //         onPress: () =>
    //           dispatch(
    //             CommonActions.reset({
    //               routes: [{ name: "MainBottomTab" }],
    //             })
    //           ),
    //         status: "basic",
    //       },
    //     ],
    //     buttonsViewStyle: { alignSelf: "center" },
    //   },
    // });
  }, []);

  const checkQr = async (id: string) => {
    reduxDispatch(toggleScreen(true));

    try {
      const response = await getQuestionnaire(id);
      if (response.message) {
        Toast.show({
          type: "error",
          text1: response.message,
          text2: "Cari QR yang lainnya yuk!",
        });
        goBack();
      } else {
        handleUsed(response.data);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Tidak ada Petunjuk / Clue",
        text2: "QR Code tidak sesuai!",
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

export default QuestionnaireScanner;

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
