import { Banner } from "mad-expo-core";
import { Component } from "react";
import { View, StyleSheet } from "react-native";

import { BUILD_CONFIGURATION, getEnvironment } from "../constants/settings";

const getBannerColor = (environment) => {
  switch (environment) {
    case "dev":
      return "plum";
    case "test":
      return "orange";
    default:
      return "tomato";
  }
};

const environmentBanner = (ScreenComponent) =>
  class extends Component {
    render() {
      const environment = getEnvironment();
      const backgroundColor = getBannerColor(environment);

      return (
        <View style={{ flex: 1 }}>
          {environment !== "prod" && (
            <Banner
              text={BUILD_CONFIGURATION}
              viewStyle={[styles.container, { backgroundColor }]}
            />
          )}
          <ScreenComponent {...this.props} />
        </View>
      );
    }
  };

const styles = StyleSheet.create({
  container: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default environmentBanner;
