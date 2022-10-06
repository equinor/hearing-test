import { BaseApiService } from "mad-expo-core";

import appJson from "../../app.json";
import { getResource } from "../../constants/settings";
import store from "../../store/config";
import {
  postMockTakeTest,
  fetchMockMe,
  fetchMockTests,
} from "./mocked-api-methods";

const appName = appJson.expo.name;

const defaultResource = getResource("hearing");
const madResource = getResource("mad");

const defaultApi = new BaseApiService(defaultResource);
const madApi = new BaseApiService(madResource);

// Helper functions
const fetchData = (path, api = defaultApi) =>
  api.get(path).then((res) => res.data);

const fetchOpenData = (path, api = defaultApi) =>
  api.get(path, { authenticate: false }).then((res) => res.data);

const postData = (path, payload, api = defaultApi) =>
  api.post(path, payload).then((res) => res.data);

export const appInit = () => fetchData("/appStartup/init");

export const fetchMe = () =>
  store.getState().appConfig.current.demoMode
    ? fetchMockMe()
    : fetchData("/me");

export function getReleaseNote(version) {
  return fetchData(`/ReleaseNote/${appName}/${version}`, madApi);
}

export const getServiceMessage = () =>
  fetchOpenData(`/ServiceMessage/${appName}`, madApi);

export const fetchTests = () =>
  store.getState().appConfig.current.demoMode
    ? fetchMockTests()
    : fetchData("/me/tests");

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
