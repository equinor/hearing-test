import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCommander } from 'react-native-salute';
import environmentBanner from '../utils/environmentBanner';
import serviceMessage from '../utils/serviceMessage';

export const mapParamsToProps = ScreenComponent =>
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

const withUtilities = ScreenComponent => {
  const withEnvironmentBanner = environmentBanner(ScreenComponent);
  const withServiceMessage = serviceMessage(withEnvironmentBanner);
  const WithCommander = withCommander(withServiceMessage);
  return WithCommander;
};

export default withUtilities;
