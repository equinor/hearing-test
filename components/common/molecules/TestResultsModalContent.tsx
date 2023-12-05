import { Dispatch, SetStateAction } from "react";

import { Loading } from "./Loading";
import { TestResultChart } from "./TestResultChart";
import { TestResults } from "./TestResults";
import { TestResultState } from "./TestResultsModal";
import { useTestResults } from "../../../hooks/useTestResults";

type TestResultsModalContentProps = {
  setTestResult: Dispatch<SetStateAction<TestResultState>>;
  testResult: TestResultState;
};

export const TestResultsModalContent = ({
  setTestResult,
  testResult,
}: TestResultsModalContentProps) => {
  const { isFetching, testResults } = useTestResults();

  if (isFetching) {
    return <Loading />;
  }

  if (testResult) {
    return <TestResultChart testResult={testResult} />;
  }

  return (
    <TestResults setTestResult={setTestResult} testResults={testResults} />
  );
};
