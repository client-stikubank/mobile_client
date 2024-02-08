import React, { memo, useRef } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import Swiper from "react-native-swiper";
import Image from "react-native-scalable-image";
import { find, truncate } from "lodash";
import dayjs from "dayjs";

import { Images } from "assets/images";
import Text from "components/Text";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";

const MyCertificate = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const carnival = useSelector((state: any) => state.Carnival.carnival);
  const userProfile = useSelector(
    (state: any) => state.UserProfile.userProfile
  );

  const finishedCamps = carnival.finished_camps;
  const finishedSchedules = carnival.finished_schedules;
  const { user_profile } = userProfile;

  return (
    <View style={styles.myCertificateContainer}>
      <Text style={styles.subTitle} category="h6" mt={24}>
        My E-certificate
      </Text>
      {finishedCamps.length > 0 ? (
        <Flex style={{ height: 700 }}>
          <Swiper style={styles.swiper} loop={false}>
            {finishedCamps.map((camp: any) => (
              <Flex justify="center" style={{ flex: 1 }} key={camp?.id}>
                <Flex
                  alignItems="flex-start"
                  justify="flex-start"
                  style={styles.relative}
                >
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
                    {truncate(camp?.subtitle)}
                  </Text>
                  <Text category="h10-s" style={styles.campDate}>
                    {dayjs(
                      find(finishedSchedules, {
                        stage_camp: { camp: { id: camp?.id } },
                      })?.stage_camp_schedule?.started_at
                    )
                      .locale("id")
                      .format("DD MMMM YYYY")}
                  </Text>
                  <Image
                    source={Images.eCertificate}
                    resizeMode="contain"
                    width={350}
                  />
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
    top: "33.5%",
    textAlign: "center",
    zIndex: 99,
  },
  textMentor: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "57%",
    fontWeight: "bold",
    color: "#EE157F",
    textAlign: "center",
    zIndex: 99,
  },
  campTitle: {
    position: "absolute",
    left: "17%",
    top: "41%",
    fontWeight: "bold",
    color: "#EE157F",
    zIndex: 99,
  },
  campDate: {
    position: "absolute",
    left: "17%",
    top: "43.5%",
    fontWeight: "bold",
    color: "#EE157F",
    zIndex: 99,
  },
  swiper: {
    // height: 400,
    // paddingBottom: 16
  },
});
