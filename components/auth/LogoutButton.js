import { Button, logout } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import * as colors from "../../constants/colors";
import * as actions from "../../store";
import { getAuthStatus } from "../../store/auth";
import { authStatusTypes } from "../../types";

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: "white",
  },
  buttonText: {
    color: colors.RED,
    fontWeight: "bold",
  },
});

class LogoutButton extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    authStatus: PropTypes.oneOf(Object.keys(authStatusTypes)).isRequired,
    signOut: PropTypes.func.isRequired,
  };

  render() {
    const { data } = this.props;
    return (
      <Button
        title={data.text}
        onPress={() => {
          this.props.setConfig({ key: "demoMode", value: false });
          logout();
          this.props.nav.navigate("LoginRoute");
        }}
        textStyle={styles.buttonText}
        viewStyle={styles.defaultButton}
      />
    );
  }
}

LogoutButton.propTypes = {
  data: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actions.loginSignOut()),
  setConfig: (appConfig) => dispatch(actions.setConfig(appConfig)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
