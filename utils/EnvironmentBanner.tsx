import { Typography } from "@equinor/mad-components";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Environment, getEnvironment } from "../constants/settings";

const getBannerColor = (environment: Environment) => {
  switch (environment) {
    case "dev":
      return "#FFCDD7";
    case "test":
      return "#FFE7D6";
    default:
      return "#C9E0E2";
  }
};

export const EnvironmentBanner = () => {
  const insets = useSafeAreaInsets();
  const environment = getEnvironment();
  const backgroundColor = getBannerColor(environment);

  if (environment === "prod") return null;

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={[styles.container, { backgroundColor }]}>
        <Typography>{environment} environment</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
