import { getAccount } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import Settings from "../components/Settings";
import { getConfig } from "../store/app-config";
import { getCurrentUser } from "../store/auth";

class SettingsScreen extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      displayableId: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  state = {
    currentUser: null,
  };

  componentDidMount() {
    if (this.props.appConfig.demoMode) {
      this.setState({ currentUser: "John" });
    } else {
      getAccount().then((response) => {
        this.setState({ currentUser: response.username });
      });
    }
  }

  render() {
    console.log("currentUser-state:" + this.state.currentUser);
    const { navigation } = this.props;
    return this.state.currentUser ? (
      <Settings navigation={navigation} currentUser={this.state.currentUser} />
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state) => ({
  appConfig: getConfig(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(SettingsScreen);
