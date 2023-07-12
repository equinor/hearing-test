import { StyleSheet, Text, View } from "react-native";

import * as Colors from "../../../constants/colors";

export type SimpleItem = {
  key: string;
  label: string;
  text: string;
};

type SimpleInfoItemProps = {
  item: SimpleItem;
};

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

export const SimpleInfoItem = ({ item }: SimpleInfoItemProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{item.label}</Text>
    <Text style={styles.text}>{item.text}</Text>
  </View>
);
