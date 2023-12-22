import { MadConfig } from "@equinor/mad-core";
import { ImageSourcePropType } from "react-native";

import appJson from "./app.json";
import Logo from "./assets/images/logo.png";
import {
  ApplicationInsightsInstrumentationKey,
  AzureADClientId,
  AzureADRedirectUrl,
  getApiEndpoints,
  getEnvironment,
  getScopes,
} from "./constants/settings";

export const config: MadConfig = {
  appVersion: appJson.expo.version,
  servicePortalName: "HearingTest",
  currentEnvironment: getEnvironment(),
  language: {
    supportedLanguages: [{ code: "nb", name: "Norwegian" }],
    skipOnboarding: true,
  },
  authentication: {
    redirectUri: AzureADRedirectUrl,
    clientId: AzureADClientId,
    scopes: getScopes("hearing"),
  },
  login: {
    title: appJson.expo.name,
    logo: Logo as ImageSourcePropType,
  },
  applicationInsights: {
    instrumentationKey: ApplicationInsightsInstrumentationKey,
  },
  serviceNow: {
    whatever: "",
  },
  about: {
    endpoints: getApiEndpoints(),
    buildNumber: appJson.expo.ios.buildNumber,
  },
};
