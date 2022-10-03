import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import { EQUINOR_GREEN } from "../../../constants/colors";
import { MaterialIconName } from "../../../types";

const IconButton = (props: {
  icon: MaterialIconName;
  onPress: Function;
  style?: StyleProp<ViewStyle>;
}) => {
  const [activeTouch, setActiveTouch] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setActiveTouch(true)}
      onPressOut={() => setActiveTouch(false)}
      onPress={() => {
        props.onPress();
      }}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: activeTouch ? "#DEEDEE" : "transparent",
          borderRadius: 180,
          height: 48,
          width: 48,
        },
        props.style,
      ]}
    >
      <Icon name={props.icon} size={24} color={EQUINOR_GREEN} />
    </TouchableOpacity>
  );
};

export default IconButton;
