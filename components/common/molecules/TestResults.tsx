import { Typography } from "@equinor/mad-components";
import { Dispatch, SetStateAction } from "react";
import { FlatList } from "react-native";

import { TestResultState } from "./TestResultsModal";
import { TestResult } from "../../../types";
import { formatDate } from "../../../utils/date";
import NavigationItem from "../atoms/NavigationItem";

type TestResultsProps = {
  setTestResult: Dispatch<SetStateAction<TestResultState>>;
  testResults: TestResult[];
};

export const TestResults = ({
  setTestResult,
  testResults,
}: TestResultsProps) => {
  if (testResults.length < 1) {
    return (
      <Typography>
        Du har ikke fullført noen tester. Gå tilbake og ta en hørselstest.
      </Typography>
    );
  }

  return (
    <FlatList
      data={testResults}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NavigationItem
          onPress={() => setTestResult(item)}
          title={formatDate(item.dateTaken)}
        />
      )}
    />
  );
};
