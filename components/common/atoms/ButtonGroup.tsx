import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type ButtonGroupProps = {
  children: ReactNode;
};

export const ButtonGroup = ({ children }: ButtonGroupProps) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 12,
  },
});
