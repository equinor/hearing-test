import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defaultNavOptions } from '../navigation';
import { getCurrentUser } from '../store/auth';
import Settings from '../components/Settings';

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

  static navigationOptions = () => ({
    ...defaultNavOptions,
    title: 'Settings',
  });

  render() {
    const { navigation, currentUser } = this.props;
    return <Settings navigation={navigation} currentUser={currentUser} />;
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(SettingsPage);
