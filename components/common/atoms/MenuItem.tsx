import { Typography } from "@equinor/mad-components";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "../../../constants/colors";
import { MaterialIconName } from "../../../types";

type Props = {
  icon: MaterialIconName;
  text: string;
  onPress: () => void;
};

export const MenuItem = ({ icon, text, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon
      name={icon}
      size={24}
      color={COLORS.ICON}
      style={{ marginRight: 20 }}
    />
    <Typography style={{ flex: 1 }}>{text}</Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
