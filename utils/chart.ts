import { Ear, HearingLevel, Level, Point } from "../types";
import { median } from "./math";
import { getHearingThresholdsPerFrequency } from "./testResults";

export const getChartData = ({ leftEar, rightEar }: Level) => ({
  leftEar: getPoints(leftEar),
  rightEar: getPoints(rightEar),
});

export const getPoints = (hearingLevels: HearingLevel[]) => {
  const hearingThresholds = getHearingThresholdsPerFrequency(hearingLevels);
  const points: Point[] = [];
  const frequencies = Object.keys(hearingThresholds);
  frequencies.forEach((hz) => {
    points.push({ x: Number(hz), y: median(hearingThresholds[hz]) });
  });
  return points;
};

export const getDotSize = (index: number, ear: Ear) => {
  if (ear === "left") return index === 0 ? 14 : 10;
  return index === 0 ? 10 : 6;
};
