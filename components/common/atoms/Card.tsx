import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, onPress, style }: CardProps) => (
  <TouchableOpacity
    disabled={!onPress}
    onPress={onPress}
    style={[styles.container, style]}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 5,
    margin: 4,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
