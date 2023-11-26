import { Typography } from "mad-expo-core";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { LEFT_EAR, RIGHT_EAR } from "../../../constants/colors";
import { Ear } from "../../../types";

type EarLabelProps = { ear: Ear; style?: StyleProp<ViewStyle> };

export const EarLabel = ({ ear, style }: EarLabelProps) => (
  <View style={[styles.container, style]}>
    <View
      style={[
        styles.circle,
        { backgroundColor: ear === "left" ? LEFT_EAR : RIGHT_EAR },
      ]}
    />
    <Typography>{ear === "left" ? "Venstre" : "Høyre"} øre</Typography>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", flexDirection: "row" },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    marginRight: 8,
  },
});
