import React, { Component } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

import appJson from "../../app.json";
import {
  getResource,
  getConfiguredResources,
  BuildConfiguration,
} from "../../constants/settings";
import AppInfo from "../components/AppInfo";
import { defaultNavOptions } from "../navigation";

const aboutListTitle = "About app";

export default class AboutPage extends Component {
  static navigationOptions = () => ({
    ...defaultNavOptions,
    title: aboutListTitle,
  });

  render() {
    const resources = getConfiguredResources();
    const getApiEndpoints = () =>
      resources
        .map((resource) => getResource(resource).ApiBaseUrl.toString())
        .join("\n");

    const sections = [
      {
        key: "Client",
        data: [
          {
            key: "BuildConfig",
            label: "Configuration",
            text: BuildConfiguration,
          },
          {
            key: "BuildNr",
            label: "BuildNr",
            text:
              Platform.OS === "ios"
                ? appJson.expo.ios.buildNumber
                : appJson.expo.web.buildNumber,
          },
          {
            key: "AppVersion",
            label: "App version",
            text: appJson.expo.version,
          },
        ],
      },
      {
        key: "Api",
        data: [
          {
            key: "ApiBaseUrl",
            label: resources.length > 1 ? "Endpoints" : "Endpoint",
            text: getApiEndpoints(),
          },
        ],
      },
    ];
    return <AppInfo sections={sections} />;
  }
}
