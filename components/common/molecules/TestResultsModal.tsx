import React, { useState } from "react";
import { Modal, View } from "react-native";

import TestLogScreen from "../../../screens/TestLogScreen";
import { TestResult } from "../../../types";
import IconButton from "../EDS/IconButton";
import Typography from "../atoms/Typography";
import TestResultItem from "./TestResultItem";

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
        <IconButton
          icon="list"
          onPress={() => {
            setSelectedItem(null);
          }}
        />
        <Typography variant="h1">Din hørsel</Typography>
        <IconButton
          icon="close"
          onPress={() => {
            setSelectedItem(null);
            props.setInvisible();
          }}
        />
      </View>
      {selectedItem ? (
        <TestResultItem
          data={selectedItem}
          resetSelectedItem={() => setSelectedItem(null)}
        />
      ) : (
        <TestLogScreen
          setSelectedItem={(d: TestResult) => setSelectedItem(d)}
        />
      )}
    </Modal>
  );
};

export default TestResultsModal;
