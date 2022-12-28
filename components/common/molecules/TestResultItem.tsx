import { Typography } from "mad-expo-core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { MOSS_GREEN_100, TEXT } from "../../../constants/colors";
import { ChartData, TestResult } from "../../../types";
import { getChartData } from "../../../utils/chart";
import { IconButton } from "../EDS/IconButton";
import { Chart } from "./Chart";

type Props = {
  data: TestResult;
  resetSelectedItem: () => void;
  hideTop?: boolean;
};

export const TestResultItem: React.FC<Props> = ({
  data,
  resetSelectedItem,
  hideTop = false,
}) => {
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
            {new Date(data.dateTaken).toLocaleDateString("nb-NO", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
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
});
