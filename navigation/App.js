import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
//import configureTrustKit from "react-native-trustkit-wrapper";
import { Provider } from "react-redux";

// import HockeyApp from 'react-native-hockeyapp';
// import { HockeyAppIdentifier, BuildConfiguration } from '../settings';
//import AppNavigator from "./navigation";
import store from "../store/config";
import trustKitConfig from "../trustKitConfig.json";
import { metricKeys, track } from "../utils/metrics";
import Navigation from "./";
import AuthContext from "./AuthContext";
import { setNavigator } from "./service";

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
    AppState.addEventListener("change", this.handleChange);
    // configureTrustKit(trustKitConfig).catch((err) => {
    //   if (err.code) {
    //     // console.warn('Trust kit configuration only changed when app re-launches');
    //   }
    // });

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    SplashScreen.hide();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "change",
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = () => {
    store.dispatch({
      type: "Connectivity/SET",
      payload: true,
    });
  };

  handleChange = (nextAppState) => {
    if (nextAppState === "background") {
      track(metricKeys.APP_BACKGROUND);
    } else if (nextAppState === "active") {
      track(metricKeys.APP_ACTIVE);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <AuthContext>
            <Navigation />
          </AuthContext>
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
  //   <AppNavigator
  //     ref={(ref) => {
  //       setNavigator(ref);
  //     }}
  //   />
  // </Provider>
}
