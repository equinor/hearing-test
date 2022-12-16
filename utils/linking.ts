import { Alert, Linking } from "react-native";

import { URL } from "../types";

export const openURL = async (url: URL) => {
  const canOpenURL = await Linking.canOpenURL(url);
  if (canOpenURL) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
