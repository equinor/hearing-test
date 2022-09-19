import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Typography } from "mad-expo-core";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";

import * as Colors from "../../../constants/colors";

const TextLink = ({
  data,
  textStyle = {},
  nav,
}: {
  data: { name: string; route?: string };
  textStyle: StyleProp<TextStyle>;
  nav: { state: object; navigate: Function };
}) => (
  <TouchableOpacity
    onPress={() => nav.navigate(data.route)}
    style={{
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h6"
      style={[{ color: Colors.EQUINOR_GREEN }, textStyle]}
    >
      {data.name}
    </Typography>
    <Icon color={Colors.GRAY_2} name="arrow-forward-ios" size={12} />
  </TouchableOpacity>
);

export default TextLink;
