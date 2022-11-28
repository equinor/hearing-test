import { Environment, Resource, ResourceName } from "../types";
import { BuildConfiguration, Resources } from "./settings.json";

export {
  AzureADTenantId,
  AzureADAuthority,
  AzureADClientId,
  AzureADRedirectUrl,
  AzureADRedirectUrlWeb,
  BuildConfiguration,
} from "./settings.json";

export const getConfiguredResources = () => Object.keys(Resources);

export const getResource = (name: ResourceName) => Resources[name] as Resource;

export const getApiBaseUrl = (name: ResourceName) =>
  getResource(name).ApiBaseUrl;

export const getScopes = (name: ResourceName) => getResource(name).scopes;

export const getEnvironment = (): Environment => {
  const environment = BuildConfiguration.toLowerCase() as
    | "dev"
    | "test"
    | "release";

  if (environment === "release") {
    return "prod";
  }

  return environment;
};
