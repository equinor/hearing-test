import { Button } from "mad-expo-core";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import * as colors from "../../constants/colors";
import * as actions from "../../store";
import { getAuthStatus } from "../../store/auth";

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

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actions.loginSignOut()),
  setConfig: (appConfig) => dispatch(actions.setConfig(appConfig)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
