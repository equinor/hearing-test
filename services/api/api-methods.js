import { authenticateSilently } from "mad-expo-core";

import appJson from "../../app.json";
import { getResource } from "../../constants/settings";
import store from "../../store/config";
import { NetworkException } from "../../utils/Exception";
import {
  postMockTakeTest,
  fetchMockMe,
  fetchMockTests,
} from "./mocked-api-methods";

const appName = appJson.expo.name;
const defaultResource = "hearing";
const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const createUrl = (resource, path) =>
  `${getResource(resource).ApiBaseUrl}${path}`;

// Helper functions
const fetchData = (path, resource = defaultResource, parseJson = true) =>
  authenticateSilently(getResource(resource).scopes).then((r) =>
    fetch(createUrl(resource, path), {
      method: "GET",
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then((response) => {
      if (response.ok) {
        if (parseJson) {
          return response.json();
        }
        return response.ok;
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

export const postData = (
  path,
  data,
  method = "POST",
  resource = defaultResource
) =>
  authenticateSilently(getResource(resource).scopes).then((r) =>
    fetch(createUrl(resource, path), {
      method,
      body: JSON.stringify(data),
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

const fetchOpenData = (path, resource = defaultResource) =>
  authenticateSilently(getResource(resource).scopes).then((r) =>
    fetch(createUrl(resource, path), {
      method: "GET",
      ...jsonHeaders,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

export function getReleaseNote(version) {
  return fetchData(`/ReleaseNote/${appName}/${version}`, "mad");
}

export const getServiceMessage = () =>
  fetchOpenData(`/ServiceMessage/${appName}`, "mad");

export const postTakeTest = () =>
  store.getState().appConfig.current.demoMode
    ? postMockTakeTest()
    : postData(`/me/tests/takeTest`, {
        hz500Db: 0,
        hz1000Db: 0,
        hz2000Db: 0,
        hz3000Db: -81.4,
        hz4000Db: -75.9,
        hz6000Db: -69.6,
        hz8000Db: 0,
      });

export const postTest = (body) => postData(`/me/tests`, body);

export const appInit = () =>
  fetchData("/appStartup/init", defaultResource, false);

export const fetchTests = () =>
  store.getState().appConfig.current.demoMode
    ? fetchMockTests()
    : fetchData("/me/tests");

export const fetchMe = () =>
  store.getState().appConfig.current.demoMode
    ? fetchMockMe()
    : fetchData("/me");
