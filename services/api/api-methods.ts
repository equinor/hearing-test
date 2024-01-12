import { authenticateSilently, getIsDemoModeEnabled } from "@equinor/mad-core";

import {
  postMockTakeTest,
  fetchMockMe,
  fetchMockTests,
  fetchMockSounds,
} from "./mocked-api-methods";
import { getApiBaseUrl, getScopes } from "../../constants/settings";
import { Sound, TestResult, User } from "../../types";
import { NetworkException } from "../../utils/Exception";

const defaultResource = "hearing";
const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const createUrl = (resource, path) =>
  `${getApiBaseUrl(resource)}${path}`;

// Helper functions
const fetchData = (path, resource = defaultResource, parseJson = true) =>
  authenticateSilently(getScopes(resource)).then((r) =>
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
  authenticateSilently(getScopes(resource)).then((r) =>
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

export const postTakeTest = () =>
  getIsDemoModeEnabled()
    ? postMockTakeTest()
    : postData(`/me/tests/takeTest`, {
        hz500Db: -74.2,
        hz1000Db: -74.4,
        hz2000Db: -71.4,
        hz3000Db: -71.4,
        hz4000Db: -65.9,
        hz6000Db: -59.6,
        hz8000Db: -60.9,
      });

export const postTest = (body): Promise<TestResult> =>
  postData(`/me/tests`, body);

export const fetchTests = (): Promise<TestResult[]> =>
  getIsDemoModeEnabled() ? fetchMockTests() : fetchData("/me/tests");

export const fetchMe = (): Promise<User> =>
  getIsDemoModeEnabled() ? fetchMockMe() : fetchData("/me");

export const fetchSounds = (): Promise<Sound[]> =>
  getIsDemoModeEnabled() ? fetchMockSounds() : fetchData("/appstartup/sounds");
