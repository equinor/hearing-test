import { Resources } from "./settings.json";

export {
  AzureADTenantId,
  AzureADAuthority,
  AzureADClientId,
  AzureADRedirectUrl,
  AzureADRedirectUrlWeb,
  BuildConfiguration,
  HearingTestURLSchemeWeb,
} from "./settings.json";

export const getResource = (name) => Resources[name];

export const getConfiguredResources = () => Object.keys(Resources);
