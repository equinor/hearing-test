import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from "victory-native";

import {
  DOT_LABEL,
  GRID,
  LEFT_EAR,
  MOSS_GREEN_13,
  MOSS_GREEN_21,
  MOSS_GREEN_34,
  MOSS_GREEN_55,
  RIGHT_EAR,
} from "../../../constants/colors";
import { ChartData, HEARING_THRESHOLD } from "../../../types";
import { getDotSize } from "../../../utils/chart";

type Props = { chartData: ChartData };

export const Chart: React.FC<Props> = ({ chartData }) => {
  // X
  const hzMin = 400;
  const hzMax = 10000;
  const hzTickValues = [500, 1000, 2000, 3000, 4000, 6000, 8000, 10000];

  // Y
  const dbMin = -10;
  const dbMax = 120;
  const dbTickValues = [-10, 0, 20, 40, 70, 90, 120];

  return (
    <VictoryChart
      minDomain={{ x: hzMin, y: dbMin }}
      maxDomain={{ x: hzMax, y: dbMax }}
      scale={{ x: "log", y: "linear" }}
      style={{
        parent: { position: "relative", left: 16, marginBottom: -20 },
      }}
      theme={VictoryTheme.material}
    >
      <VictoryArea
        data={[
          {
            x: hzMin,
            y0: dbMin,
            y: HEARING_THRESHOLD.NORMAL,
          },
          {
            x: hzMax,
            y0: dbMin,
            y: HEARING_THRESHOLD.NORMAL,
          },
        ]}
        labels={["Normal hørsel"]}
        labelComponent={<VictoryLabel dx={44} dy={-5} />}
        style={{ data: { fill: "white" } }}
      />
      <VictoryArea
        data={[
          {
            x: hzMin,
            y0: HEARING_THRESHOLD.NORMAL,
            y: HEARING_THRESHOLD.MILD_LOSS,
          },
          {
            x: hzMax,
            y0: HEARING_THRESHOLD.NORMAL,
            y: HEARING_THRESHOLD.MILD_LOSS,
          },
        ]}
        labels={["Mildt hørselstap"]}
        labelComponent={<VictoryLabel dx={50} dy={-5} />}
        style={{ data: { fill: MOSS_GREEN_13 } }}
      />
      <VictoryArea
        data={[
          {
            x: hzMin,
            y0: HEARING_THRESHOLD.MILD_LOSS,
            y: HEARING_THRESHOLD.MODERATE_LOSS,
          },
          {
            x: hzMax,
            y0: HEARING_THRESHOLD.MILD_LOSS,
            y: HEARING_THRESHOLD.MODERATE_LOSS,
          },
        ]}
        labels={["Moderat hørselstap"]}
        labelComponent={<VictoryLabel dx={58} dy={-5} />}
        style={{ data: { fill: MOSS_GREEN_21 } }}
      />
      <VictoryArea
        data={[
          {
            x: hzMin,
            y0: HEARING_THRESHOLD.MODERATE_LOSS,
            y: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
          },
          {
            x: hzMax,
            y0: HEARING_THRESHOLD.MODERATE_LOSS,
            y: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
          },
        ]}
        labels={["Betydelig hørselstap"]}
        labelComponent={<VictoryLabel dx={62} dy={-5} />}
        style={{ data: { fill: MOSS_GREEN_34 } }}
      />
      <VictoryArea
        data={[
          {
            x: hzMin,
            y0: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
            y: dbMax,
          },
          {
            x: hzMax,
            y0: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
            y: dbMax,
          },
        ]}
        labels={["Alvorlig hørselstap"]}
        labelComponent={<VictoryLabel dx={60} dy={-5} />}
        style={{ data: { fill: MOSS_GREEN_55 } }}
      />
      <VictoryAxis
        label
        axisLabelComponent={<VictoryLabel text="Frekvens (Hz)" dy={-30} />}
        offsetY={50}
        orientation="top"
        tickValues={hzTickValues}
        tickFormat={(tickValue) => {
          if (tickValue === 10000) return "";
          return tickValue < 1000 ? tickValue : `${tickValue / 1000}k`;
        }}
        style={{ grid: { stroke: GRID } }}
      />
      <VictoryAxis
        dependentAxis
        invertAxis
        label
        axisLabelComponent={<VictoryLabel text="Høreterskel (dB)" dy={-30} />}
        tickValues={dbTickValues}
        gridComponent={<></>}
        style={{ grid: { stroke: GRID } }}
      />
      <VictoryLine
        data={chartData.leftEar}
        style={{
          data: { stroke: LEFT_EAR },
          parent: { border: "1px solid #ccc" },
        }}
      />
      <VictoryScatter
        data={chartData.leftEar}
        labelComponent={<VictoryLabel dy={7} style={{ fill: DOT_LABEL }} />}
        labels={["V"]}
        size={({ index }) => getDotSize(index, "left")}
        style={{ data: { fill: LEFT_EAR } }}
      />
      <VictoryLine
        data={chartData.rightEar}
        style={{
          data: { stroke: RIGHT_EAR },
          parent: { border: "1px solid #ccc" },
        }}
      />
      <VictoryScatter
        data={chartData.rightEar}
        labelComponent={<VictoryLabel dy={7} style={{ fill: DOT_LABEL }} />}
        labels={["H"]}
        size={({ index }) => getDotSize(index, "right")}
        style={{ data: { fill: RIGHT_EAR } }}
      />
    </VictoryChart>
  );
};
