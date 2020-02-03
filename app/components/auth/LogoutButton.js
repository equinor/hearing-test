import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from '../common';
import * as colors from '../../stylesheets/colors';
import { getAuthStatus, actions } from '../../store/auth';
import { authStatusTypes } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: colors.RED,
    textAlign: 'right',
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: '500',
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

    if (nextAuthStatus !== prevAuthStatus && nextAuthStatus === authStatusTypes.SIGNED_OUT) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'LoginRoute',
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
        style={styles.container}
        viewStyle={styles.defaultButton}
        textStyle={styles.buttonText}
        onPress={this.onButtonClick}
      />
    );
  }
}

LogoutButton.propTypes = {
  data: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(actions.loginSignOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton);
