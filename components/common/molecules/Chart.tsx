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
import { CHART, ChartData, HEARING_THRESHOLD } from "../../../types";
import { getDotSize } from "../../../utils/chart";

type Props = { data: ChartData };

export const Chart: React.FC<Props> = ({ data }) => (
  <VictoryChart
    minDomain={{ x: CHART.HZ_MIN, y: CHART.DB_MIN }}
    maxDomain={{ x: CHART.HZ_MAX, y: CHART.DB_MAX }}
    scale={{ x: "log", y: "linear" }}
    style={{
      parent: { position: "relative", left: 16, marginBottom: -20 },
    }}
    theme={VictoryTheme.material}
  >
    <VictoryArea
      data={[
        {
          x: CHART.HZ_MIN,
          y0: CHART.DB_MIN,
          y: HEARING_THRESHOLD.NORMAL,
        },
        {
          x: CHART.HZ_MAX,
          y0: CHART.DB_MIN,
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
          x: CHART.HZ_MIN,
          y0: HEARING_THRESHOLD.NORMAL,
          y: HEARING_THRESHOLD.MILD_LOSS,
        },
        {
          x: CHART.HZ_MAX,
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
          x: CHART.HZ_MIN,
          y0: HEARING_THRESHOLD.MILD_LOSS,
          y: HEARING_THRESHOLD.MODERATE_LOSS,
        },
        {
          x: CHART.HZ_MAX,
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
          x: CHART.HZ_MIN,
          y0: HEARING_THRESHOLD.MODERATE_LOSS,
          y: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
        },
        {
          x: CHART.HZ_MAX,
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
          x: CHART.HZ_MIN,
          y0: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
          y: CHART.DB_MAX,
        },
        {
          x: CHART.HZ_MAX,
          y0: HEARING_THRESHOLD.CONSIDERABLE_LOSS,
          y: CHART.DB_MAX,
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
      tickValues={[500, 1000, 2000, 3000, 4000, 6000, 8000, CHART.HZ_MAX]}
      tickFormat={(tickValue) => {
        if (tickValue === CHART.HZ_MAX) return "";
        return tickValue < 1000 ? tickValue : `${tickValue / 1000}k`;
      }}
      style={{ grid: { stroke: GRID } }}
    />
    <VictoryAxis
      dependentAxis
      invertAxis
      label
      axisLabelComponent={<VictoryLabel text="Høreterskel (dB)" dy={-30} />}
      tickValues={[
        CHART.DB_MIN,
        0,
        HEARING_THRESHOLD.NORMAL,
        HEARING_THRESHOLD.MILD_LOSS,
        HEARING_THRESHOLD.MODERATE_LOSS,
        HEARING_THRESHOLD.CONSIDERABLE_LOSS,
        CHART.DB_MAX,
      ]}
      gridComponent={<></>}
      style={{ grid: { stroke: GRID } }}
    />
    <VictoryLine
      data={data.leftEar}
      style={{
        data: { stroke: LEFT_EAR },
        parent: { border: "1px solid #ccc" },
      }}
    />
    <VictoryScatter
      data={data.leftEar}
      labelComponent={<VictoryLabel dy={7} style={{ fill: DOT_LABEL }} />}
      labels={["V"]}
      size={({ index }) => getDotSize(index, "left")}
      style={{ data: { fill: LEFT_EAR } }}
    />
    <VictoryLine
      data={data.rightEar}
      style={{
        data: { stroke: RIGHT_EAR },
        parent: { border: "1px solid #ccc" },
      }}
    />
    <VictoryScatter
      data={data.rightEar}
      labelComponent={<VictoryLabel dy={7} style={{ fill: DOT_LABEL }} />}
      labels={["H"]}
      size={({ index }) => getDotSize(index, "right")}
      style={{ data: { fill: RIGHT_EAR } }}
    />
  </VictoryChart>
);
