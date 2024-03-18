import { SUBHEADINGS, getSubheading } from "./getSubheading";

describe("getSubheading", () => {
  test(`should return "${SUBHEADINGS.LOADING}" when isLoading is true`, () => {
    const subheading = getSubheading(true, false);
    expect(subheading).toBe(SUBHEADINGS.LOADING);
  });

  test(`should return "${SUBHEADINGS.TEST_IS_RUNNING}" when isTestRunning is true`, () => {
    const subheading = getSubheading(false, true);
    expect(subheading).toBe(SUBHEADINGS.TEST_IS_RUNNING);
  });

  test(`should return "${SUBHEADINGS.TEST_HAS_LOADED}" when both isLoading and isTestRunning are false`, () => {
    const subheading = getSubheading(false, false);
    expect(subheading).toBe(SUBHEADINGS.TEST_HAS_LOADED);
  });

  test(`should return "${SUBHEADINGS.LOADING}" when both isLoading and isTestRunning are true`, () => {
    const subheading = getSubheading(true, true);
    expect(subheading).toBe(SUBHEADINGS.LOADING);
  });
});
