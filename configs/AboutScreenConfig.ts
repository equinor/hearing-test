import appJson from "../app.json";
import { BUILD_CONFIGURATION, getApiEndpoints } from "../constants/settings";
import { Section } from "../screens/AboutScreen";

export const aboutScreenConfig: Section[] = [
  {
    title: "Client",
    data: [
      {
        label: "Configuration",
        text: BUILD_CONFIGURATION,
      },
      {
        label: "BuildNr",
        text: appJson.expo.ios.buildNumber,
      },
      {
        label: "App version",
        text: appJson.expo.version,
      },
    ],
  },
  {
    title: "Api",
    data: [
      {
        label: "Endpoints",
        text: getApiEndpoints(),
      },
    ],
  },
];
