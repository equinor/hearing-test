import { ImageSourcePropType } from "react-native";

import doctor from "../assets/images/doctor.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import warning from "../assets/images/warning.png";
import { TestResultButtonConfigurations, TestResultPage, TestResult } from "../types";

export const useTestResultPages = (
  testResult: TestResult,
  unsentTests: number,
  buttons: TestResultButtonConfigurations
) => {
  type Pages = {
    newTestInSixMonths: TestResultPage;
    newTestRecommended: TestResultPage;
    hearingChangeDetected: TestResultPage;
    testIsSent: TestResultPage;
    sendingTestFailed: TestResultPage;
  };

  const pages: Pages = {
    newTestInSixMonths: {
      title: "Testen er fullført",
      image: thumbsUp,
      subTitle: "Dette ser fint ut!",
      description:
        "Du vil få en ny invitasjon om 6 måneder, men vær oppmerksom på at jo oftere du tar testen, jo bedre.",
      buttons: [buttons.seeResult],
    },
    newTestRecommended: {
      title: "Her ble det litt krøll",
      image: warning,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "For beste mulige resultater, vennligst ta hørselstesten på ny.",
      buttons: [buttons.newTest],
    },
    hearingChangeDetected: {
      title: "Testen er fullført",
      image: doctor,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "Det er oppdaget en endring i hørselen din. Vennligst ta kontakt med sykepleier for en manuell undersøkelse.",
      buttons: [buttons.seeResult],
    },
    sendingTestFailed: {
      title: "Her ble det litt krøll",
      image: warning,
      subTitle: "Testen ble ikke sendt",
      description:
        "Testen ble lagret, men den må sendes for undersøkelse. Koble deg på nettet og prøv igjen. Testen kan også sendes fra hovedmenyen.",
      buttons: [buttons.sendTest],
    },
    testIsSent: {
      title: "Testen er fullført",
      image: thumbsUp,
      subTitle: "Takk for at du testet appen!",
      description:
        "Du blir kontaktet av en lege dersom du har problemer med hørselen.",
      buttons: [buttons.seeResult],
    },
  };

  if (unsentTests > 0) return pages.sendingTestFailed;

  switch (testResult.result) {
    case "Ok":
      return pages.newTestInSixMonths;
    case "Outlier":
      return pages.newTestRecommended;
    case "NotOk":
      return pages.hearingChangeDetected;
    default:
      return pages.testIsSent;
  }
};
