import { Banner } from "mad-expo-core";
import { Component } from "react";
import { View, StyleSheet } from "react-native";

import { BuildConfiguration } from "../constants/settings";

const getBannerColor = (lowerCaseBuildConfiguration) => {
  switch (lowerCaseBuildConfiguration) {
    case "dev":
      return "plum";
    case "test":
      return "orange";
    case "qa":
      return "yellowgreen";
    default:
      return "tomato";
  }
};

const environmentBanner = (ScreenComponent) =>
  class extends Component {
    render() {
      const lowerCaseBuildConfiguration = BuildConfiguration.toLowerCase();
      const backgroundColor = getBannerColor(lowerCaseBuildConfiguration);
      return (
        <View style={{ flex: 1 }}>
          {lowerCaseBuildConfiguration !== "release" &&
            lowerCaseBuildConfiguration !== "prod" &&
            lowerCaseBuildConfiguration !== "test" && (
              <Banner
                text={BuildConfiguration}
                viewStyle={[styles.bannerView, { backgroundColor }]}
              />
            )}
          <ScreenComponent {...this.props} />
        </View>
      );
    }
  };

const styles = StyleSheet.create({
  bannerView: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default environmentBanner;
