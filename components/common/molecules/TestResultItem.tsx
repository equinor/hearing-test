import { Typography } from "@equinor/mad-components";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Chart } from "./Chart";
import { ChartData, TestResult } from "../../../types";
import { getChartData } from "../../../utils/chart";
import { formatDate } from "../../../utils/date";
import { EarLabel } from "../atoms/EarLabel";

type TestResultItemProps = {
  data: TestResult;
  showDate?: boolean;
};

export const TestResultItem = ({
  data,
  showDate = true,
}: TestResultItemProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    setChartData(getChartData(data.level));
  }, []);

  return (
    <View style={styles.container}>
      {showDate && (
        <Typography variant="h5" color="primary" style={styles.date}>
          {formatDate(data.dateTaken)}
        </Typography>
      )}
      <ScrollView style={styles.content}>
        <Typography style={{ marginLeft: 18 }}>{data.name}</Typography>
        <View style={{ alignItems: "center" }}>
          {chartData === null ? (
            <Typography>Mangler data for å vise resultat</Typography>
          ) : (
            <Chart data={chartData} />
          )}
        </View>
        <View style={styles.labels}>
          <EarLabel ear="left" style={{ marginRight: 24 }} />
          <EarLabel ear="right" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  date: { textAlign: "center", marginVertical: 16 },
  content: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
