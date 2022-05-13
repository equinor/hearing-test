import PropTypes from "prop-types";
import React, { Component } from "react";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";

import * as actions from "../../store";
import { getAuthStatus, getCurrentUser } from "../../store/auth";
import { getIsConnected } from "../../store/connectivity";
import { getVersion } from "../../store/version";
import { LoginView } from "../components/auth";
import { authStatusTypes } from "../types";

class LoginPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    appVersion: PropTypes.string,
    hasConnectivity: PropTypes.bool.isRequired,
    authStatus: PropTypes.oneOf(Object.keys(authStatusTypes)).isRequired,
    authenticate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    appVersion: null,
  };

  componentDidMount() {
    if (this.props.authStatus === authStatusTypes.NOT_AUTHENTICATED) {
      this.props.authenticate(true);
    }
    if (this.props.authStatus === authStatusTypes.AUTHENTICATED) {
      this.checkAppVersionAndNavigate();
    }
  }

  componentDidUpdate(prevProps) {
    const { authStatus: nextAuthStatus } = this.props;
    const { authStatus: prevAuthStatus } = prevProps;

    if (
      nextAuthStatus !== prevAuthStatus &&
      nextAuthStatus === authStatusTypes.AUTHENTICATED
    ) {
      this.checkAppVersionAndNavigate();
    }
  }

  checkAppVersionAndNavigate() {
    // If version number is persisted and same, do not show onboarding/features
    const version = DeviceInfo.getVersion();
    if (this.props.appVersion === version) {
      this.props.navigation.navigate("MainRoute");
    } else {
      this.props.navigation.navigate("FeatureRoute");
    }
  }

  render() {
    return (
      <LoginView
        hasConnectivity={this.props.hasConnectivity}
        authStatus={this.props.authStatus}
        authenticate={this.props.authenticate}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
  authenticate: (silent) => dispatch(actions.login(silent)),
});

const mapStateToProps = (state) => ({
  appVersion: getVersion(state),
  hasConnectivity: getIsConnected(state),
  authStatus: getAuthStatus(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
