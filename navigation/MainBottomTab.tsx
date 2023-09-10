import React, { memo, useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService,
} from "@ui-kitten/components";

import Text from "components/Text";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import { getUserProfile, homeDisplay, getRewards } from "store/actions";
import Activities from "src/activities";
import Reward from "src/reward";

import { MainBottomTabStackParamList } from "./types";
import MoreNavigator from "./MoreNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

interface ButtonTabProps {
  focused: boolean;
  icon: string;
  numberNotification?: number;
  onPress?: void;
}

const BottomTab = createBottomTabNavigator<MainBottomTabStackParamList>();

const MainBottomTab = memo(() => {
  const reduxDispatch = useDispatch();
  const theme = useTheme();
  const { height, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    reduxDispatch(getUserProfile());
  }, []);

  const ButtonTab = React.useCallback(
    ({ focused, icon, numberNotification }: ButtonTabProps) => {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            ...globalStyle.center,
          }}
        >
          {numberNotification ? (
            focused ? null : (
              <View style={styles.notification}>
                <Text center category="h9" status="primary" mt={1.5}>
                  {numberNotification}
                </Text>
              </View>
            )
          ) : null}
          <Icon
            pack="assets"
            name={!focused ? icon : `${icon}Active`}
            style={{
              width: 24,
              height: 24,
              tintColor: focused
                ? theme["button-basic-color"]
                : theme["text-placeholder-color"],
            }}
          />
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: styles.styleLabel,
          tabBarStyle: [
            styles.tabBarStyle,
            {
              height: (54 + bottom) * (height / 812),
            },
          ],
        }}
      >
        <BottomTab.Screen
          name="Beranda"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <ButtonTab
                focused={focused}
                icon="home"
                numberNotification={undefined}
              />
            ),
          }}
          listeners={{
            tabPress: () => reduxDispatch(homeDisplay("carnival")),
          }}
        />
        <BottomTab.Screen
          name="Reward"
          component={Reward}
          options={{
            tabBarIcon: ({ focused }) => (
              <ButtonTab focused={focused} icon="hourlyRate" />
            ),
          }}
          listeners={{
            tabPress: () => reduxDispatch(getRewards()),
          }}
        />
        <BottomTab.Screen
          name="Aktivitas"
          component={Activities}
          options={{
            tabBarIcon: ({ focused }) => (
              <ButtonTab focused={focused} icon="calendar" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Pengaturan"
          component={MoreNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <ButtonTab focused={focused} icon="more" />
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
});
export default MainBottomTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -44,
    paddingTop: 12,
  },
  styleLabel: {
    color: "color-primary-100",
    fontSize: 11,
    lineHeight: 24,
  },
  buttonTab: {
    borderRadius: 12,
    height: 40,
    width: 40,
  },
  notification: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "button-basic-color",
    width: 16,
    height: 16,
    zIndex: 10,
    top: 2,
    right: 1,
  },
});
