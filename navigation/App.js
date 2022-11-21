import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";

import store from "../store/config";
import { metricKeys, track } from "../utils/metrics";
import Navigation from "./";

export default class App extends Component {
  componentDidMount() {
    AppState.addEventListener("change", this.handleChange);

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
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
