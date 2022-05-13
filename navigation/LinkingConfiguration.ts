/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { HearingTestURLSchemeWeb } from "../constants/settings";
import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    Linking.makeUrl("/"),
    "http://localhost:19006",
    HearingTestURLSchemeWeb,
  ],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      AboutRoute: "about",
      FeedbackRoute: "feedback",
      SettingsRoute: "settings",
      Modal: "modal",
      Feature: "feature",
      NotFound: "*",
    },
  },
};

export default linking;
