import { useNavigation } from "@react-navigation/native";
import { Button } from "mad-expo-core";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import * as colors from "../../constants/colors";
import * as actions from "../../store";

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: "white",
  },
  buttonText: {
    color: colors.RED,
    fontWeight: "bold",
  },
});

const LogoutButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Log out"
      onPress={() => {
        navigation.navigate("LoginRoute");
      }}
      textStyle={styles.buttonText}
      viewStyle={styles.defaultButton}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  setConfig: (appConfig) => dispatch(actions.setConfig(appConfig)),
});

export default connect(mapDispatchToProps)(LogoutButton);
