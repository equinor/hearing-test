import { Button } from "mad-expo-core";
import { StyleSheet } from "react-native";

import * as colors from "../../constants/colors";

type LogoutButtonProps = {
  onPress: CallableFunction;
};

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: "white",
  },
  buttonText: {
    color: colors.RED,
    fontWeight: "bold",
  },
});

const LogoutButton = ({ onPress }: LogoutButtonProps) => (
  <Button
    title="Log out"
    onPress={() => {
      onPress();
    }}
    textStyle={styles.buttonText}
    viewStyle={styles.defaultButton}
  />
);

export default LogoutButton;
