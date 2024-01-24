/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/"), "http://localhost:19006"],
  config: {
    screens: {
      LoginRoute: "login",
      ReleaseNoteRoute: "releasenote",
      Settings: "settings",
      AboutRoute: "about",
      FeedbackRoute: "feedback",
      NotFoundRoute: "*",
    },
  },
};

export default linking;
