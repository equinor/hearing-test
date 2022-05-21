import { MaterialIcons as Icon } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

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
    style={styles.container}
  >
    <View style={styles.linkContainer}>
      <Text style={[styles.defaultText, textStyle]}>{data.name}</Text>
      <Icon
        color={Colors.GRAY_2}
        name="arrow-forward-ios"
        size={12}
        style={styles.icon}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultText: {
    flex: 1,
  },
  icon: {
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  linkContainer: {
    flex: 1,
    flexDirection: "row",
  },
});

export default TextLink;
