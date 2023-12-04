import { alert } from "@equinor/mad-components";
import { Linking } from "react-native";

import { URL } from "../types";

export const openURL = async (url: URL) => {
  const canOpenURL = await Linking.canOpenURL(url);
  if (canOpenURL) {
    await Linking.openURL(url);
  } else {
    alert("Ups!", `Klarte ikke å åpne siden: ${url}`, [
      { text: "OK", onPress: () => {}, style: "cancel" },
    ]);
  }
};
