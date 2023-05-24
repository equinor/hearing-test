import appJson from "../app.json";
import AppInfo from "../components/AppInfo";
import {
  getConfiguredResources,
  BuildConfiguration,
  getApiBaseUrl,
} from "../constants/settings";

export const AboutScreen = () => {
  const resources = getConfiguredResources();

  const getApiEndpoints = () =>
    resources.map((resource) => getApiBaseUrl(resource)).join("\n");

  const sections = [
    {
      key: "Klient",
      data: [
        {
          key: "BuildConfig",
          label: "Konfigurasjon",
          text: BuildConfiguration,
        },
        {
          key: "BuildNr",
          label: "Bygg nummer",
          text: appJson.expo.ios.buildNumber,
        },
        {
          key: "AppVersion",
          label: "Versjon",
          text: appJson.expo.version,
        },
      ],
    },
    {
      key: "API",
      data: [
        {
          key: "ApiBaseUrl",
          label: resources.length > 1 ? "Endepunkter" : "Endepunkt",
          text: getApiEndpoints(),
        },
      ],
    },
  ];
  return <AppInfo sections={sections} />;
};
