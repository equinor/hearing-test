import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Typography } from "mad-expo-core";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ICON, TEXT } from "../../../constants/colors";
import { MaterialIconName } from "../../../types";

type Props = {
  icon: MaterialIconName;
  text: string;
  onPress: () => void;
};

export const MenuItem = ({ icon, text, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name={icon} size={24} color={ICON} style={{ marginRight: 20 }} />
    <Typography color={TEXT} style={{ flex: 1 }}>
      {text}
    </Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
});
