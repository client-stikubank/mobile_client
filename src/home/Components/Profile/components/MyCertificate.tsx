import React, { memo, useRef, useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import Swiper from "react-native-swiper";
import { Image } from "expo-image";
import { find, truncate } from "lodash";
import dayjs from "dayjs";

import { Images } from "assets/images";
import Text from "components/Text";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";

const MyCertificate = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const userProfile = useSelector(
    (state: any) => state.UserProfile.userProfile
  );

  const finishedCamps = carnival.finished_camps;
  const finishedSchedules = carnival.finished_schedules;
  const { user_profile } = userProfile;

  // Function to handle image load and calculate height
  const handleImageLoad = (event: any) => {
    const { width: naturalWidth, height: naturalHeight } = event.source;
    const { width: screenWidth } = Dimensions.get("window");

    // Calculate height maintaining aspect ratio
    const containerWidth = screenWidth * 0.9; // Assuming 90% of screen width with some padding
    const aspectRatio = naturalWidth / naturalHeight;
    const calculatedHeight = containerWidth / aspectRatio;

    setImageHeight(calculatedHeight);
  };

  return (
    <View style={styles.myCertificateContainer}>
      <Text style={styles.subTitle} category="h6" mt={24}>
        My E-certificate
      </Text>
      {finishedCamps.length > 0 ? (
        <Flex>
          <Swiper style={styles.swiper} loop={false}>
            {finishedCamps.map((camp: any) => (
              <Flex justify="center" style={{ flex: 1 }} key={camp?.id}>
                <Flex
                  alignItems="flex-start"
                  justify="flex-start"
                  style={styles.relative}
                >
                  <Image
                    source={Images.eCertificate}
                    style={{
                      width: "100%",
                      height: imageHeight || 200, // Use calculated height or fallback
                      alignSelf: "flex-start",
                    }}
                    contentFit="contain"
                    onLoad={handleImageLoad}
                  />
                  <Text category="h8" style={styles.textName}>
                    {user_profile?.full_name}
                  </Text>
                  <Text category="h7" style={styles.textMentor}>
                    {truncate(
                      `${camp?.speaker?.user_profile?.first_name} ${camp?.speaker?.user_profile?.last_name}`,
                      { length: 46 }
                    )}
                  </Text>
                  <Text category="h10-s" style={styles.campTitle}>
                    {truncate(camp?.subtitle) +
                      " — " +
                      dayjs(
                        find(finishedSchedules, {
                          stage_camp: { camp: { id: camp?.id } },
                        })?.stage_camp_schedule?.started_at
                      )
                        .locale("id")
                        .format("DD MMMM YYYY")}
                  </Text>
                  {/* <Text category="h10-s" style={styles.campDate}>
                    {dayjs(
                      find(finishedSchedules, {
                        stage_camp: { camp: { id: camp?.id } },
                      })?.stage_camp_schedule?.started_at
                    )
                      .locale("id")
                      .format("DD MMMM YYYY")}
                  </Text> */}
                </Flex>
              </Flex>
            ))}
          </Swiper>
        </Flex>
      ) : (
        <Text mb={16}>Kamu belum mengikuti pelatihan 🙁</Text>
      )}
    </View>
  );
});

export default MyCertificate;

const themedStyles = StyleService.create({
  myCertificateContainer: {},
  subTitle: {
    marginBottom: 8,
  },
  relative: {
    position: "relative",
  },
  textName: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "28%",
    textAlign: "center",
    zIndex: 99,
  },
  textMentor: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "55%",
    fontWeight: "bold",
    color: "#EE157F",
    textAlign: "center",
    zIndex: 99,
  },
  campTitle: {
    position: "absolute",
    left: "18%",
    top: "35.5%",
    fontWeight: "bold",
    color: "#EE157F",
    zIndex: 99,
  },
  campDate: {
    position: "absolute",
    left: "17%",
    top: "38%",
    fontWeight: "bold",
    color: "#EE157F",
    zIndex: 99,
  },
  swiper: {
    // height: 400,
    // paddingBottom: 16
  },
});
