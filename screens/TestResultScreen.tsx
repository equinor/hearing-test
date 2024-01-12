import { Button, Typography } from "@equinor/mad-components";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { ButtonGroup } from "../components/common/atoms/ButtonGroup";
import { ErrorBanner } from "../components/common/atoms/ErrorBanner";
import { SlideModal } from "../components/common/molecules/SlideModal";
import { TestResultChart } from "../components/common/molecules/TestResultChart";
import {
  TestResultPageButtons,
  useTestResultPages,
} from "../hooks/useTestResultPages";
import { postTest as actionPostTest } from "../store/test/actions";
import { selectIsFetching, selectTestResult } from "../store/test/reducer";
import { getUnsentTests } from "../store/unsent-tests/reducer";
import { ANALYSIS_FLAG, RootStackScreenProps } from "../types";

type TestResultScreenProps = RootStackScreenProps<"TestResultRoute">;

export const TestResultScreen = ({ navigation }: TestResultScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const isFetching = useSelector(selectIsFetching);
  const testResult = useSelector(selectTestResult);
  const unsentTests = useSelector(getUnsentTests);
  const dispatch = useDispatch();

  const buttons: TestResultPageButtons = {
    seeResult: {
      title: "Se resultat",
      onPress: () => setModalVisible(true),
    },
    newTest: {
      title: "Ta ny test",
      onPress: () => navigation.navigate("TestRoute"),
    },
    sendTest: {
      title: "Send",
      onPress: () => {
        dispatch(actionPostTest(unsentTests[0]));
        setResendCount((prevResendCount) => prevResendCount + 1);
      },
      variant: resendCount > 0 ? "outlined" : "contained",
    },
  };

  if (unsentTests.length > 0) {
    testResult.result = ANALYSIS_FLAG.SEND_FAILED;
  }

  const page = useTestResultPages(testResult, buttons);

  return (
    <SafeAreaView style={styles.container}>
      <ErrorBanner />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleAndCloseButton}>
          <Button.Icon name="ghost" style={styles.placeholderIcon} />
          <Typography variant="h2" color="primary">
            {page.title}
          </Typography>
          <Button.Icon
            name="close"
            onPress={() => navigation.navigate("Root")}
            variant="ghost"
          />
        </View>
        <Image source={page.image} style={styles.image} />
        <View style={styles.subtitleAndDescription}>
          <Typography variant="h5" color="primary" style={styles.subtitle}>
            {page.subtitle}
          </Typography>
          <Typography style={styles.description}>{page.description}</Typography>
        </View>
        <ButtonGroup>
          {page.buttons.map((props) => (
            <Button
              key={props.title}
              {...props}
              loading={isFetching}
              style={styles.button}
            />
          ))}
        </ButtonGroup>
      </ScrollView>
      <SlideModal
        setInvisible={() => setModalVisible(false)}
        title="Resultater"
        visible={modalVisible}
      >
        <TestResultChart testResult={testResult} />
      </SlideModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    gap: 32,
  },
  titleAndCloseButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholderIcon: { opacity: 0 },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  subtitleAndDescription: {
    alignItems: "center",
    maxWidth: 300,
  },
  subtitle: { marginBottom: 8 },
  description: { textAlign: "center" },
  button: { width: 160 },
});
