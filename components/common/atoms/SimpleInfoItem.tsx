import { StyleSheet, Text, View } from "react-native";

import * as Colors from "../../../constants/colors";

export type SimpleItem = {
  label: string;
  text: string;
};

type SimpleInfoItemProps = {
  item: SimpleItem;
};

export const SimpleInfoItem = ({
  item: { label, text },
}: SimpleInfoItemProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontStyle: "italic",
  },
  text: {
    color: Colors.GRAY_1,
    fontSize: 14,
  },
});
