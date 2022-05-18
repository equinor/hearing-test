import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { getCurrentUser } from "../../store/auth";
import Settings from "../components/Settings";

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

  render() {
    const { navigation, currentUser } = this.props;
    return <Settings navigation={navigation} currentUser={currentUser} />;
  }
}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(SettingsPage);
