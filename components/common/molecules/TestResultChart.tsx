import { Typography } from "@equinor/mad-components";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Chart } from "./Chart";
import { Loading } from "./Loading";
import { ChartData, TestResult } from "../../../types";
import { getChartData } from "../../../utils/chart";
import { formatDate } from "../../../utils/date";
import { EarLabel } from "../atoms/EarLabel";

type TestResultChartProps = {
  testResult: TestResult;
};

export const TestResultChart = ({ testResult }: TestResultChartProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    setChartData(getChartData(testResult.level));
  }, []);

  if (!chartData) {
    return <Loading verticalAlignment="top" />;
  }

  return (
    <View style={styles.container}>
      <Typography variant="h5" color="primary" style={styles.date}>
        {formatDate(testResult.dateTaken)}
      </Typography>
      <Chart data={chartData} />
      <View style={styles.labels}>
        <EarLabel ear="left" style={{ marginRight: 24 }} />
        <EarLabel ear="right" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", backgroundColor: "white", flex: 1 },
  date: { marginBottom: 24 },
  labels: {
    flexDirection: "row",
  },
});
