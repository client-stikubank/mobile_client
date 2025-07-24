import React, { memo } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Button } from "@ui-kitten/components";

import Text from "./Text";
import Container from "./Container";

import { SuccessScreenType } from "constants/Types";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

const NotificationScreen = memo(
  ({
    title,
    description,
    actions,
    buttonsViewStyle,
    logo,
  }: SuccessScreenType) => {
    const { width, height } = useLayout();
    const sizeIMG = 160 * (width / 375);

    return (
      <Container style={styles.container}>
        <View style={styles.top}>
          <View>
            <Image
              style={{
                width: width,
                marginTop: 36,
                height: 294 * (height / 812),
              }}
              source={Images.successBg}
            />
            {logo === undefined && (
              <Image
                style={{
                  width: sizeIMG,
                  height: sizeIMG,
                  position: "absolute",
                  bottom: 30,
                  alignSelf: "center",
                }}
                source={Images.success}
              />
            )}
            {logo === true && (
              <View
                style={{
                  position: "absolute",
                  bottom: -50,
                  alignSelf: "center",
                }}
              >
                <Image
                  source={Images.mascotGroupOne}
                  style={{ width: 280, height: 280 * (height / 812) }}
                  resizeMode="contain"
                />
              </View>
            )}
            {typeof logo === "string" && (
              <Image
                style={{
                  width: sizeIMG,
                  height: sizeIMG,
                  position: "absolute",
                  bottom: 0,
                  alignSelf: "center",
                  borderRadius: 15,
                }}
                source={{ uri: logo }}
              />
            )}
            {typeof logo === "number" && (
              <Image
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: "center",
                  borderRadius: 15,
                }}
                source={logo}
              />
            )}
          </View>
          <Text center category="h3" mb={8} mt={56} bold>
            {title}
          </Text>
          <Text category="h7-s" center mb={44} mh={24}>
            {description}
          </Text>
          {actions?.map((item: any, i: number) => {
            return (
              <Button
                key={i}
                style={[
                  item.status === "basic" ? globalStyle.shadowBtn : undefined,
                  { alignItems: "center", marginBottom: 16 },
                  buttonsViewStyle,
                ]}
                children={item?.title}
                status={item?.status}
                onPress={item?.onPress}
              />
            );
          })}
        </View>
      </Container>
    );
  }
);

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingHorizontal: 86,
  },
});
