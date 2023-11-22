import { Button } from "@equinor/mad-components";
import { useState } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

import { ButtonGroup } from "../components/common/atoms/ButtonGroup";
import { ErrorBanner } from "../components/common/atoms/ErrorBanner";
import Typography from "../components/common/atoms/Typography";
import { TestResultItem } from "../components/common/molecules/TestResultItem";
import { useTestResultPages } from "../hooks/useTestResultPages";
import { postTest } from "../store/test/actions";
import {
  selectIsFetching,
  selectTest,
  selectTestResult,
} from "../store/test/reducer";
import { getUnsentTests } from "../store/unsent-tests/reducer";
import {
  RootStackScreenProps,
  TestResult,
  TestResultButtonConfigurations,
} from "../types";

type TestResultScreenProps = RootStackScreenProps<"TestResultRoute"> & {
  actionPostTest: Function;
  isFetching: boolean;
  testResult: TestResult;
  unsentTests: any[];
};

const TestResultScreen = ({
  actionPostTest,
  isFetching,
  navigation,
  testResult,
  unsentTests,
}: TestResultScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const buttons: TestResultButtonConfigurations = {
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
        actionPostTest(unsentTests[0]);
        setResendCount((prevResendCount) => prevResendCount + 1);
      },
      variant: resendCount > 0 ? "outlined" : "contained",
    },
  };

  if (unsentTests.length > 0) {
    testResult.result = "SendFailed";
  }

  const page = useTestResultPages(testResult, buttons);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ErrorBanner />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ width: 40, height: 40 }} />
        <Typography variant="h1">{page.title}</Typography>
        <Button.Icon
          name="close"
          onPress={() => navigation.navigate("DefaultRoute")}
          variant="ghost"
        />
      </View>
      <View style={styles.container}>
        {/*  Results-header section */}
        <View style={styles.centerContainer}>
          <Image
            source={page.image}
            style={{ height: 250, resizeMode: "contain" }}
          />
          <Typography variant="h2">{page.subTitle}</Typography>
          <Typography
            variant="p"
            style={{
              marginTop: 12,
              textAlign: "center",
            }}
          >
            {page.description}
          </Typography>
        </View>
        <ButtonGroup>
          {page.buttons.map((props) => (
            <Button key={props.title} {...props} loading={isFetching} />
          ))}
        </ButtonGroup>
      </View>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderStyle: "solid",
            borderColor: "#DCDCDC",
            marginTop: 110,
            backgroundColor: "white",
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View style={{ width: 40, height: 40 }} />
          <Typography variant="h1">Resultater</Typography>
          <Button.Icon
            name="close"
            onPress={() => setModalVisible(false)}
            variant="ghost"
          />
        </View>
        <TestResultItem data={testResult} showDate={false} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  centerContainer: {
    alignItems: "center",
    maxWidth: 300,
    paddingBottom: 24,
  },
});

const mapDispatchToProps = (dispatch) => ({
  actionPostTest: (test) => dispatch(postTest(test)),
});

const mapStateToProps = (state) => ({
  isFetching: selectIsFetching(state),
  testResult: selectTestResult(state),
  test: selectTest(state),
  unsentTests: getUnsentTests(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultScreen);
