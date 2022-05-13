import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { BuildConfiguration } from "../../constants/settings";
import Banner from "../components/common/molecules/Banner";

const styles = StyleSheet.create({
  bannerView: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const environmentBanner = (ScreenComponent) =>
  class extends Component {
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      const lowerCaseBuildConfiguration = BuildConfiguration.toLowerCase();
      return (
        <View style={{ flex: 1 }}>
          {lowerCaseBuildConfiguration !== "release" && (
            <Banner text={BuildConfiguration} viewStyle={styles.bannerView} />
          )}
          <ScreenComponent {...this.props} />
        </View>
      );
    }
  };

export default environmentBanner;
