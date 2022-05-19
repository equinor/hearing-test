import { LoginScreen } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import appJson from "../../app.json";
import * as ENVIRONMENT from "../../constants/settings";
import logo from "../../resources/images/logo.png";
import * as actions from "../../store";
import { getVersion } from "../../store/version";

class LoginPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    appVersion: PropTypes.string,
  };

  static defaultProps = {
    appVersion: null,
  };

  render() {
    return (
      <LoginScreen
        navigation={this.props.navigation}
        scope={ENVIRONMENT.getResource("hearing").scopes[0]}
        bundleIdentifier={appJson.expo.ios.bundleIdentifier}
        mainRoute={
          // If version number is persisted and same, do not show onboarding/features
          this.props.appVersion === appJson.expo.version
            ? "DefaultRoute"
            : "FeatureRoute"
        }
        logo={logo}
        showDemoButton
        onDemoPress={() => {
          this.props.onDemoPress({ key: "demoMode", value: true });
          this.props.navigation.navigate("DefaultRoute");
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDemoPress: (config) => dispatch(actions.setConfig(config)),
});

const mapStateToProps = (state) => ({
  appVersion: getVersion(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
