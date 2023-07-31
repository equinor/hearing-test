import * as mockData from "./mock-data.json";

// Use the delayFactor parameter to vary load
// times for specific api call methods.

const fetchMockData = (data, delayFactor = 1.0) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), 1500 * delayFactor);
  });

export function getMockReleaseNote() {
  return fetchMockData(mockData.ReleaseNotes, 0.5);
}

export const fetchMockTests = () => fetchMockData(mockData.Tests, 0);

export const fetchMockMe = () => fetchMockData(mockData.Me, 0);

export const postMockTakeTest = () => fetchMockData(mockData.Test, 0);

export const fetchMockSounds = () => fetchMockData(mockData.Test.sounds, 0);
