import { useState } from "react";

import { SlideModal, SlideModalProps } from "./SlideModal";
import { TestResultsModalContent } from "./TestResultsModalContent";
import { TestResult } from "../../../types";

export type TestResultState = TestResult | null;

type TestResultsModalProps = Pick<SlideModalProps, "setInvisible" | "visible">;

export const TestResultsModal = ({
  setInvisible,
  visible,
}: TestResultsModalProps) => {
  const [testResult, setTestResult] = useState<TestResultState>(null);

  return (
    <SlideModal
      setInvisible={() => {
        setTestResult(null);
        setInvisible();
      }}
      title="Dine resultater"
      visible={visible}
      leftIconButtonProps={{
        disabled: !testResult,
        name: "format-list-bulleted",
        onPress: () => setTestResult(null),
      }}
    >
      {visible && (
        <TestResultsModalContent
          setTestResult={setTestResult}
          testResult={testResult}
        />
      )}
    </SlideModal>
  );
};
