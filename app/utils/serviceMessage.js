import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Banner from '../components/common/molecules/Banner';
import { selectServiceMessage } from '../store/service-message/reducer';
import * as Colors from '../stylesheets/colors';

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.RED,
    padding: 12,
    paddingTop: 24,
  },
  textStyle: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});

const serviceMessage = ScreenComponent => {
  class serviceMessageComponent extends Component {
    static navigationOptions = ScreenComponent.navigationOptions;
    static propTypes = {
      message: PropTypes.string.isRequired,
    };
    render() {
      return (
        <View style={{ flex: 1 }}>
          {!!this.props.message && (
            <Banner
              viewStyle={styles.viewStyle}
              textStyle={styles.textStyle}
              text={this.props.message}
            />
          )}
          <ScreenComponent {...this.props} />
        </View>
      );
    }
  }

  const mapStateToProps = state => ({
    message: selectServiceMessage(state),
  });

  const mapDispatchToProps = () => ({});

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(serviceMessageComponent);
};

export default serviceMessage;
