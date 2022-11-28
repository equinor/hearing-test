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
          text: appJson.expo.ios.buildNumber,
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
};
