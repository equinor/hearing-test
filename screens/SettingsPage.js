import { getAccount } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import Settings from "../components/Settings";
import { getCurrentUser } from "../store/auth";

class SettingsPage extends Component {
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
    getAccount().then((response) => {
      this.setState({ currentUser: response.username });
    });
    console.log("HAR SATT currentUser state til: " + this.state.currentUser);
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
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(SettingsPage);
