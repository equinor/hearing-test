import mockConfig from "../../../mock-config";
import * as mockData from "./mock-data.json";

// Use the delayFactor parameter to vary load
// times for specific api call methods.
const { delay } = mockConfig;

const fetchMockData = (data, delayFactor = 1.0) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), delay * delayFactor);
  });

export function getReleaseNoteMock() {
  return fetchMockData(mockData.ReleaseNotes, 0.5);
}

export const fetchTestsMock = () => fetchMockData(mockData.Tests, 0, 5);

export const fetchMeMock = () => fetchMockData(mockData.Me, 0, 5);

export const postTakeTestMock = () => fetchMockData(mockData.Test, 0, 5);
