import React, { Component } from 'react';
import { AppState, SafeAreaView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import configureTrustKit from 'react-native-trustkit-wrapper';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
// import HockeyApp from 'react-native-hockeyapp';
// import { HockeyAppIdentifier, BuildConfiguration } from '../settings';
import { metricKeys, track } from '../utils/metrics';
import trustKitConfig from '../trustKitConfig.json';
import AppNavigator from '../navigation';
import { setNavigator } from '../navigation/service';
import store from '../store/config';

/*
todo: Use AppCenter instead of HockeyApp
HockeyApp.configure(HockeyAppIdentifier, true);
if (BuildConfiguration !== 'Dev') {
  // HockeyApp.start();
  track(metricKeys.APP_STARTED);
}
*/

export default class App extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleChange);
    configureTrustKit(trustKitConfig).catch(err => {
      if (err.code) {
        // console.warn('Trust kit configuration only changed when app re-launches');
      }
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);

    SplashScreen.hide();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleFirstConnectivityChange);
  }

  handleFirstConnectivityChange = () => {
    store.dispatch({
      type: 'Connectivity/SET',
      payload: true,
    });
  };

  handleChange = nextAppState => {
    if (nextAppState === 'background') {
      track(metricKeys.APP_BACKGROUND);
    } else if (nextAppState === 'active') {
      track(metricKeys.APP_ACTIVE);
    }
  };

  render() {
    return (
      <Provider store={store}>
        {/* Todo: Change to a fitting backgroundColor */}
        <SafeAreaView style={{ flex: 1, backgroundColor: '#243746' }}>
          <AppNavigator
            ref={ref => {
              setNavigator(ref);
            }}
          />
        </SafeAreaView>
      </Provider>
    );
  }
}
