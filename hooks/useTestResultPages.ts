import { ButtonProps } from "@equinor/mad-components";
import { ImageSourcePropType } from "react-native";

import doctor from "../assets/images/doctor.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import warning from "../assets/images/warning.png";
import { ANALYSIS_FLAG, TestResult } from "../types";

type TestResultPage = {
  title: string;
  image: ImageSourcePropType;
  subtitle: string;
  description: string;
  buttons: ButtonProps[];
};

type TestResultPages = {
  newTestInSixMonths: TestResultPage;
  newTestRecommended: TestResultPage;
  hearingChangeDetected: TestResultPage;
  sendingTestFailed: TestResultPage;
  testIsSent: TestResultPage;
};

export type TestResultPageButtons = {
  seeResult: ButtonProps;
  newTest: ButtonProps;
  sendTest: ButtonProps;
};

export const useTestResultPages = (
  testResult: TestResult,
  buttons: TestResultPageButtons
) => {
  const pages: TestResultPages = {
    newTestInSixMonths: {
      title: "Testen er fullført",
      image: thumbsUp,
      subtitle: "Dette ser fint ut!",
      description:
        "Du vil få en ny invitasjon om 6 måneder, men vær oppmerksom på at jo oftere du tar testen, jo bedre.",
      buttons: [buttons.seeResult],
    },
    newTestRecommended: {
      title: "Her ble det litt krøll",
      image: warning,
      subtitle: "Takk for at du gjennomførte testen",
      description:
        "For beste mulige resultater, vennligst ta hørselstesten på ny.",
      buttons: [buttons.newTest],
    },
    hearingChangeDetected: {
      title: "Testen er fullført",
      image: doctor,
      subtitle: "Takk for at du gjennomførte testen",
      description:
        "Det er oppdaget en endring i hørselen din. Vennligst ta kontakt med sykepleier for en manuell undersøkelse.",
      buttons: [buttons.seeResult],
    },
    sendingTestFailed: {
      title: "Her ble det litt krøll",
      image: warning,
      subtitle: "Testen ble ikke sendt",
      description:
        "Testen ble lagret, men den må sendes for undersøkelse. Koble deg på nettet og prøv igjen. Testen kan også sendes fra hovedmenyen.",
      buttons: [buttons.sendTest],
    },
    testIsSent: {
      title: "Testen er fullført",
      image: thumbsUp,
      subtitle: "Takk for at du testet appen!",
      description:
        "Du blir kontaktet av en lege dersom du har problemer med hørselen.",
      buttons: [buttons.seeResult],
    },
  };

  switch (testResult.result) {
    case ANALYSIS_FLAG.OK:
      return pages.newTestInSixMonths;
    case ANALYSIS_FLAG.OUTLIER:
      return pages.newTestRecommended;
    case ANALYSIS_FLAG.NOT_OK:
      return pages.hearingChangeDetected;
    case ANALYSIS_FLAG.SEND_FAILED:
      return pages.sendingTestFailed;
    default:
      return pages.testIsSent;
  }
};
