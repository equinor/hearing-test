import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

import doctor from "../assets/images/doctor.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import warning from "../assets/images/warning.png";
import { ButtonProps } from "../components/common/EDS/Button";
import { IconButton } from "../components/common/EDS/IconButton";
import { ErrorBanner } from "../components/common/atoms/ErrorBanner";
import Typography from "../components/common/atoms/Typography";
import { ButtonGroup } from "../components/common/molecules/ButtonGroup";
import { TestResultItem } from "../components/common/molecules/TestResultItem";
import { postTest } from "../store/test/actions";
import {
  selectIsFetching,
  selectTest,
  selectTestResult,
} from "../store/test/reducer";
import { getUnsentTests } from "../store/unsent-tests/reducer";
import { RootStackScreenProps, TestResult } from "../types";

type Pages = {
  newTestInSixMonths: Page;
  newTestRecommended: Page;
  hearingChangeDetected: Page;
  testIsSent: Page;
  sendingTestFailed: Page;
};

type Page = {
  title: string;
  image: ImageSourcePropType;
  subTitle: string;
  description: string;
  buttons: ButtonProps[];
};

interface Props extends RootStackScreenProps<"TestResultRoute"> {
  actionPostTest: Function;
  isFetching: boolean;
  testResult: TestResult;
  unsentTests: any[];
}

const TestResultScreen = ({
  actionPostTest,
  isFetching,
  navigation,
  testResult,
  unsentTests,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const getHomeButton = (outlined?: boolean): ButtonProps => ({
    onPress: () => navigation.navigate("DefaultRoute"),
    text: "Hovedmeny",
    outlined,
  });

  const pages: Pages = {
    newTestInSixMonths: {
      title: "Testen er fullført",
      image: thumbsUp,
      subTitle: "Dette ser fint ut",
      description:
        "Du vil få en ny invitasjon om 6 måneder, men vær oppmerksom på at jo oftere du tar testen, jo bedre.",
      buttons: [getHomeButton()],
    },
    newTestRecommended: {
      title: "Her ble det litt krøll",
      image: warning,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "For beste mulige resultater, vennligst ta hørselstesten på ny.",
      buttons: [
        {
          outlined: true,
          text: "Ta ny test",
          onPress: () => navigation.navigate("TestRoute"),
        },
        getHomeButton(),
      ],
    },
    hearingChangeDetected: {
      title: "Testen er fullført",
      image: doctor,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "Det er oppdaget en endring i hørselen din. Vennligst ta kontakt med sykepleier for en manuell undersøkelse.",
      buttons: [
        {
          outlined: true,
          text: "Kontakt sykepleier",
          onPress: () => {
            /* TODO */
          },
        },
        getHomeButton(),
      ],
    },
    testIsSent: {
      title: "Testen er fullført",
      image: thumbsUp,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "Du blir kontaktet av en lege dersom du har problemer med hørselen.",
      buttons: [
        {
          outlined: true,
          text: "Se resultat",
          onPress: () => {
            setModalVisible(true);
          },
          loading: isFetching,
        },
        getHomeButton(),
      ],
    },
    sendingTestFailed: {
      title: "Her ble det litt krøll",
      image: warning,
      subTitle: "Testen ble ikke sendt",
      description:
        "Testen ble lagret, men den må sendes for undersøkelse. Koble deg på nettet og prøv igjen. Testen kan også sendes fra hovedmenyen.",
      buttons: [
        {
          outlined: resendCount > 0,
          text: "Send",
          onPress: () => {
            actionPostTest(unsentTests[0]);
            setResendCount((prevResendCount) => prevResendCount + 1);
          },
          loading: isFetching,
        },
        getHomeButton(resendCount === 0),
      ],
    },
  };

  // Feedback page
  const page =
    unsentTests.length === 0 ? pages.testIsSent : pages.sendingTestFailed; // TODO in the future, the backend will probably decide which page to show

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ErrorBanner />
      <View style={styles.container}>
        <Typography variant="h1">{page.title}</Typography>
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
        <ButtonGroup buttons={page.buttons} />
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
          <View style={{ width: 48, height: 48 }} />
          <Typography variant="h1">Resultater</Typography>
          <IconButton icon="close" onPress={() => setModalVisible(false)} />
        </View>
        <TestResultItem
          data={testResult}
          resetSelectedItem={() => {}}
          hideTop
        />
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
