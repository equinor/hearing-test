import PropTypes from "prop-types";
import React, { Component } from "react";
import { withCommander } from "react-native-salute";

import environmentBanner from "../utils/environmentBanner";
import serviceMessage from "../utils/serviceMessage";

export const mapParamsToProps = (ScreenComponent) =>
  class extends Component {
    static propTypes = {
      navigation: PropTypes.object.isRequired,
    };
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };

export const formatDate = (date) => {
  const options = {
    month: "short",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(date).toLocaleDateString("nb-NO", options);
};

const withUtilities = (ScreenComponent) => {
  const withEnvironmentBanner = environmentBanner(ScreenComponent);
  const withServiceMessage = serviceMessage(withEnvironmentBanner);
  const WithCommander = withCommander(withServiceMessage);
  return WithCommander;
};

export default withUtilities;
