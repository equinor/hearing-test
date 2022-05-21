import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, View, StyleSheet, ActivityIndicator } from "react-native";

import * as colors from "../../constants/colors";
import equinorLogo from "../../resources/images/equinor_logo.png";
import logo from "../../resources/images/logo.png";
import { authStatusTypes } from "../../types";
import { Button } from "../common";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
  },
  splashTop: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  splashBottom: {
    flex: 3,
    backgroundColor: colors.PINK_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
  },
  splashAppLogo: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  splashAction: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: colors.RED_LOGO,
  },
  buttonStyleDisabled: {
    backgroundColor: colors.GRAY_3,
  },
  buttonTextStyleDisabled: {},
});

export default class LoginView extends Component {
  static propTypes = {
    hasConnectivity: PropTypes.bool.isRequired,
    authStatus: PropTypes.oneOf(Object.keys(authStatusTypes)).isRequired,
    authenticate: PropTypes.func.isRequired,
  };

  render() {
    const { hasConnectivity, authStatus, authenticate } = this.props;

    const isInActivity =
      authStatus === authStatusTypes.AUTHENTICATING ||
      authStatus === authStatusTypes.AUTHENTICATED;
    return (
      <View style={styles.wrapper}>
        <View style={styles.splashTop}>
          <Image source={equinorLogo} />
        </View>
        <View style={styles.splashBottom}>
          <View style={styles.splashAppLogo}>
            <Image source={logo} />
          </View>
          <View style={styles.splashAction}>
            {isInActivity ? (
              <ActivityIndicator animating />
            ) : (
              <Button
                title="Log in"
                onPress={() => authenticate(false)}
                disabled={!hasConnectivity}
                viewStyle={styles.buttonStyle}
                viewStyleDisabled={styles.buttonStyleDisabled}
                textStyleDisabled={styles.buttonTextStyleDisabled}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
