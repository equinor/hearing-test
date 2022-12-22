import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useState } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { MOSS_GREEN_100, MOSS_GREEN_13 } from "../../../constants/colors";
import { MaterialIconName } from "../../../types";

type Props = {
  icon: MaterialIconName;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export const IconButton: React.FC<Props> = ({ icon, onPress, style }) => {
  const [activeTouch, setActiveTouch] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setActiveTouch(true)}
      onPressOut={() => setActiveTouch(false)}
      style={[
        styles.container,
        {
          backgroundColor: activeTouch ? MOSS_GREEN_13 : "transparent",
        },
        style,
      ]}
    >
      <Icon name={icon} size={24} color={MOSS_GREEN_100} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 180,
    height: 48,
    width: 48,
  },
});
