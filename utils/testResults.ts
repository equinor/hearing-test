import { HearingLevel } from "../types";

export const getHearingThresholdsPerFrequency = (
  hearingLevels: HearingLevel[]
) => {
  const hearingThresholds: { [key: string]: number[] } = {};
  hearingLevels.forEach(({ hz, db }) => {
    if (hearingThresholds[`${hz}`]) {
      hearingThresholds[`${hz}`].push(db);
    } else {
      hearingThresholds[`${hz}`] = [db];
    }
  });
  return hearingThresholds;
};
