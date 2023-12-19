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
  ok: TestResultPage;
  outlier: TestResultPage;
  notOk: TestResultPage;
  sendFailed: TestResultPage;
  default: TestResultPage;
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
    ok: {
      title: "Testen er fullført",
      image: thumbsUp,
      subtitle: "Dette ser fint ut!",
      description:
        "Det er ikke oppdaget en endring i hørselen siden forrige måling.",
      buttons: [buttons.seeResult],
    },
    outlier: {
      title: "Her ble det litt krøll",
      image: warning,
      subtitle: "Dette kan se ut som en feilmåling",
      description: "Ta ny test eller kontakt sykepleier.",
      buttons: [buttons.seeResult, buttons.newTest],
    },
    notOk: {
      title: "Testen er fullført",
      image: doctor,
      subtitle: "Vennligst kontakt sykepleier",
      description: "Det er oppdaget en mulig endring i hørselen din.",
      buttons: [buttons.seeResult],
    },
    sendFailed: {
      title: "Her ble det litt krøll",
      image: warning,
      subtitle: "Testen ble ikke sendt",
      description:
        "Testen ble lagret, men den må sendes for undersøkelse. Koble deg på nettet og prøv igjen. Testen kan også sendes fra hovedmenyen.",
      buttons: [buttons.sendTest],
    },
    default: {
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
      return pages.ok;
    case ANALYSIS_FLAG.OUTLIER:
      return pages.outlier;
    case ANALYSIS_FLAG.NOT_OK:
      return pages.notOk;
    case ANALYSIS_FLAG.SEND_FAILED:
      return pages.sendFailed;
    default:
      return pages.default;
  }
};
