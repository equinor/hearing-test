import {
  BuildConfiguration as _BuildConfiguration,
  Resources,
} from "./settings.json";

type BuildConfiguration = "Dev" | "Test" | "Prod";

type LowercaseBuildConfiguration = Lowercase<BuildConfiguration>;

export const BUILD_CONFIGURATION = _BuildConfiguration as BuildConfiguration;

export type Environment = "dev" | "test" | "prod";

export const getEnvironment = (): Environment => {
  const environment =
    BUILD_CONFIGURATION.toLowerCase() as LowercaseBuildConfiguration;
  return environment;
};

export const isProduction = getEnvironment() === "prod";

export type ResourceName = keyof typeof Resources;

type ResourceNames = ResourceName[];

export const getResourceNames = () => Object.keys(Resources) as ResourceNames;

type Resource = {
  AzureADResourceId: string;
  ApiBaseUrl: string;
  scopes: string[];
};

export const getResource = (name: ResourceName) => Resources[name] as Resource;

export const getApiBaseUrl = (name: ResourceName) =>
  getResource(name).ApiBaseUrl;

export const getApiEndpoints = () =>
  getResourceNames().map((name) => getApiBaseUrl(name));

export const getScopes = (name: ResourceName) => getResource(name).scopes;
