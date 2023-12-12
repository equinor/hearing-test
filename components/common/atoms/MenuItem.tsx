import { Typography } from "@equinor/mad-components";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ICON } from "../../../constants/colors";
import { MaterialCommunityIconName } from "../../../types";

type Props = {
  icon: MaterialCommunityIconName;
  text: string;
  onPress: () => void;
};

export const MenuItem = ({ icon, text, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name={icon} size={24} color={ICON} style={{ marginRight: 20 }} />
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
