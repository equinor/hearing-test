import mockConfig from "../../../mock-config";
import { ReleaseNotes } from "./mock-data.json";
import * as mockData from "./mock-data.json";

// Use the delayFactor parameter to vary load
// times for specific api call methods.
const { delay } = mockConfig;

const fetchData = (data, delayFactor = 1.0) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), delay * delayFactor);
  });

export function getReleaseNote() {
  return fetchData(ReleaseNotes, 0.5);
}

export const postTakeTest = () => fetchData(mockData.test);
