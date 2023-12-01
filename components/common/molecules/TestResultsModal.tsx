import { Button, Typography } from "@equinor/mad-components";
import { useState } from "react";
import { Modal, View } from "react-native";

import { TestResultItem } from "./TestResultItem";
import TestLogScreen from "../../../screens/TestLogScreen";
import { TestResult } from "../../../types";

const TestResultsModal = (props: {
  visible: boolean;
  setInvisible: Function;
}) => {
  const [selectedItem, setSelectedItem] = useState<TestResult | null>(null);

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent
      visible={props.visible}
      onDismiss={() => props.setInvisible()}
      onRequestClose={() => props.setInvisible()}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "#DCDCDC",
          borderStyle: "solid",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 110,
          paddingHorizontal: 24,
          paddingVertical: 12,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <Button.Icon
          name="chevron-left"
          onPress={() => setSelectedItem(null)}
          variant="ghost"
          disabled={!selectedItem}
          style={{ opacity: selectedItem ? 1 : 0 }}
        />
        <Typography variant="h3" color="primary">
          Dine resultater
        </Typography>
        <Button.Icon
          name="close"
          onPress={() => {
            setSelectedItem(null);
            props.setInvisible();
          }}
          variant="ghost"
        />
      </View>
      {selectedItem ? (
        <TestResultItem data={selectedItem} />
      ) : (
        <TestLogScreen
          setSelectedItem={(d: TestResult) => setSelectedItem(d)}
        />
      )}
    </Modal>
  );
};

export default TestResultsModal;
