import { Button } from "@equinor/mad-components";
import { useState } from "react";
import { Modal, View } from "react-native";

import { TestResultItem } from "./TestResultItem";
import TestLogScreen from "../../../screens/TestLogScreen";
import { TestResult } from "../../../types";
import Typography from "../atoms/Typography";

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
          name="format-list-bulleted"
          onPress={() => setSelectedItem(null)}
          variant="ghost"
          disabled={!selectedItem}
        />
        <Typography variant="h1">Dine resultater</Typography>
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
