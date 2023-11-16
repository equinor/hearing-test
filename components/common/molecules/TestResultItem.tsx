import { Typography } from "mad-expo-core";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Chart } from "./Chart";
import { MOSS_GREEN_100, TEXT } from "../../../constants/colors";
import { ChartData, TestResult } from "../../../types";
import { getChartData } from "../../../utils/chart";
import { formatDate } from "../../../utils/date";
import { IconButton } from "../EDS/IconButton";
import { EarLabel } from "../atoms/EarLabel";

type TestResultItemProps = {
  data: TestResult;
  resetSelectedItem: () => void;
  hideTop?: boolean;
};

export const TestResultItem = ({
  data,
  resetSelectedItem,
  hideTop = false,
}: TestResultItemProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    setChartData(getChartData(data.level));
  }, []);

  return (
    <View style={styles.container}>
      {hideTop ? null : (
        <View style={styles.top}>
          <IconButton icon="chevron-left" onPress={resetSelectedItem} />
          <Typography variant="h5" color={MOSS_GREEN_100}>
            {formatDate(data.dateTaken)}
          </Typography>
          <View style={{ width: 48, height: 48 }} />
        </View>
      )}
      <ScrollView style={styles.content}>
        <Typography
          variant="p"
          size={18}
          color={TEXT}
          style={{ marginLeft: 18 }}
        >
          {data.name}
        </Typography>
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
  container: { flex: 1, paddingTop: 4, backgroundColor: "white" },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
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
