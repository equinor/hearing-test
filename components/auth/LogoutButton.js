import { Button } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import * as colors from "../../constants/colors";
import { getAuthStatus, actions } from "../../store/auth";
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

  componentDidUpdate(prevProps) {
    const { nav, authStatus: nextAuthStatus } = this.props;
    const { authStatus: prevAuthStatus } = prevProps;

    if (
      nextAuthStatus !== prevAuthStatus &&
      nextAuthStatus === authStatusTypes.SIGNED_OUT
    ) {
      const navigateAction = NavigationActions.navigate({
        routeName: "LoginRoute",
      });
      nav.dispatch(navigateAction);
    }
  }

  onButtonClick = () => {
    const { signOut } = this.props;
    signOut();
  };

  render() {
    const { data } = this.props;
    return (
      <Button
        title={data.text}
        onPress={this.onButtonClick}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
