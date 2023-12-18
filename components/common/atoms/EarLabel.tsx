import { Typography } from "@equinor/mad-components";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS } from "../../../constants/colors";
import { Ear } from "../../../types";

type EarLabelProps = { ear: Ear; style?: StyleProp<ViewStyle> };

export const EarLabel = ({ ear, style }: EarLabelProps) => (
  <View style={[styles.container, style]}>
    <View
      style={[
        styles.circle,
        {
          backgroundColor: ear === "left" ? COLORS.LEFT_EAR : COLORS.RIGHT_EAR,
        },
      ]}
    />
    <Typography>{ear === "left" ? "Venstre" : "Høyre"} øre</Typography>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    marginRight: 8,
  },
});
