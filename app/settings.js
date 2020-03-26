import { Resources } from './settings.json';

export {
  AzureADTenantId,
  AzureADAuthority,
  AzureADClientId,
  AzureADRedirectUrl,
  ApiReleaseNoteUrl,
  HockeyAppIdentifier,
  BuildConfiguration,
  BuildDate,
} from './settings.json';

export const getResource = name => Resources[name];

export const getConfiguredResources = () => Object.keys(Resources);
