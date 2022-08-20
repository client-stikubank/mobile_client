import React from "react";

import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Icon,
  Toggle,
} from "@ui-kitten/components";
import Flex from "components/Flex";
import ButtonFill from "components/ButtonFill";
import { globalStyle } from "styles/globalStyle";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";

export interface ButtonOptionalProps {
  title: string;
  icon: string;
  onPress?(): void;
  navigateSrc?:
    | "ProfileSrc"
    | "MyChildren"
    | "EditProfile"
    | "PaymentMethod"
    | "MyPost"
    | "MoreSrc"
    | "ReferFriend";
  withToggle?: boolean;
  checked?: boolean;
  status:
    | "basic"
    | "danger"
    | "placeholder"
    | "success"
    | "facebook"
    | "warning"
    | "twitter"
    | "green"
    | "twitter-3"
    | "white"
    | "transparent"
    | "neutral";
}

const ButtonOptional = ({
  title,
  icon = "back",
  status,
  onPress,
  withToggle,
  checked,
  navigateSrc,
}: ButtonOptionalProps) => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();

  const onNavigate = React.useCallback(() => {
    navigateSrc === undefined
      ? goBack()
      : navigate("More", { screen: navigateSrc });
  }, [navigateSrc]);
  const styles = useStyleSheet(themedStyles);
  return (
    <Flex
      style={styles.container}
      itemsCenter
      mt={24}
      onPress={onPress !== undefined ? onPress : onNavigate}
    >
      <Flex justify="flex-start" itemsCenter>
        <ButtonFill icon={icon} status={status} size="medium" />
        <Text ml={24} category="para-m">
          {title}
        </Text>
      </Flex>
      {withToggle ? (
        <Toggle onChange={onPress} checked={checked} />
      ) : (
        <Icon pack="assets" name="arrowRight" style={globalStyle.icon20} />
      )}
    </Flex>
  );
};

export default ButtonOptional;

const themedStyles = StyleService.create({
  container: {},
});
