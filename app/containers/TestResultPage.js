import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defaultNavOptions } from '../navigation';
import ButtonEDS from '../components/common/EDS/Button';
import { navigate } from '../navigation/service';
import allGood from '../assets/allGood.png';
import { selectError, selectTestResult } from '../store/test/reducer';
import { STOP } from '../stylesheets/colors';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
});

class TestResultPage extends Component {
  static navigationOptions = () => ({
    ...defaultNavOptions,
    headerRight: null,
    headerLeft: null,
  });
  static propTypes = {
    error: PropTypes.object.isRequired,
    testResult: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const { error, testResult } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {error && error.status && (
          <TouchableHighlight
            style={{ backgroundColor: STOP, padding: 12, margin: 0 }}
            onPress={() =>
              Linking.openURL(
                `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`
              )
            }
          >
            <>
              <Text style={{ color: 'white' }}>Could not submit test due to</Text>
              <Text style={{ fontSize: 23, color: 'white', marginVertical: 4 }}>
                ERROR: {error.status} {error.message && `| ${error.message}`}
              </Text>
              <Text style={{ color: 'white' }}>Click to learn more...</Text>
            </>
          </TouchableHighlight>
        )}
        <SafeAreaView style={styles.component}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            {/*  Results-header section */}
            {testResult && testResult.audiogram ? (
              <Image
                style={{
                  resizeMode: 'contain',
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').width * 0.8,
                }}
                source={{
                  uri: testResult.audiogram,
                }}
              />
            ) : (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').width * 0.8,
                }}
              />
            )}
            <Image source={allGood} style={{ height: 50, width: 50, margin: 12 }} />
            <Text style={{ margin: 12 }}>Testen er nå fullført</Text>
          </View>
          <View style={{ flex: 1, marginBottom: 40, justifyContent: 'flex-end', padding: 12 }}>
            {/*  Buttons-section */}
            <ButtonEDS
              onPress={() => navigate('DefaultRoute')}
              text="Tilbake til menyen"
              outlined={false}
              small={false}
              danger={false}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  error: selectError(state),
  testResult: selectTestResult(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestResultPage);
