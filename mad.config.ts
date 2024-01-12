import { MadConfig } from "@equinor/mad-core";
import { ImageSourcePropType } from "react-native";

import appJson from "./app.json";
import Logo from "./assets/images/logo.png";
import {
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
    dev: {
      clientId: "f8ff2f9f-d270-40bf-9f61-e36cc8f4b014",
      redirectUri: "msauth.com.equinor.hearingtest.dev://auth",
      scopes: getScopes("hearing"),
    },
    test: {
      clientId: "6e6d75c4-39b2-47f7-b08c-6e82c7f2f83e",
      redirectUri: "msauth.com.equinor.hearingtest.test://auth",
      scopes: getScopes("hearing"),
    },
    prod: {
      clientId: "a780c0d7-8e5d-4053-b25d-6a287676f923",
      redirectUri: "msauth.com.equinor.hearingtest://auth",
      scopes: getScopes("hearing"),
    },
  },
  login: {
    title: "Hørselstest",
    logo: Logo as ImageSourcePropType,
  },
  applicationInsights: {
    dev: {
      instrumentationKey: "4caa232d-f121-47ed-8269-9da78a1e5bbd",
    },
    test: { instrumentationKey: "ab53a6e8-7d99-49b6-9212-572a83271f65" },
    prod: { instrumentationKey: "8dba9ec2-bd86-43e1-a628-3850eb95b052" },
  },
  serviceNow: "HØRSELSAPP",
  about: {
    endpoints: getApiEndpoints(),
    buildNumber: appJson.expo.ios.buildNumber,
  },
};
