import { ButtonProps } from "@equinor/mad-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ImageSourcePropType } from "react-native";

import adapter from "../../../assets/images/adapter.png";
import headset from "../../../assets/images/headset.png";
import scanner from "../../../assets/images/scanner.png";
import sickMan from "../../../assets/images/sick-man.png";
import thumbsDown from "../../../assets/images/thumbs-down.png";
import thumbsUp from "../../../assets/images/thumbs-up.png";
import { RootStackParamList } from "../../../types";

type PreTestPage = {
  title: string;
  image: ImageSourcePropType;
  description: string;
  current: boolean;
  buttons: ButtonProps[];
  hideIndicators?: boolean;
};

export const usePreTestPages = (
  navigation: NativeStackNavigationProp<RootStackParamList, "PreTestRoute">
) => {
  const [pages, setPages] = useState<PreTestPage[]>([
    {
      title: "Er du forkjølet?",
      image: sickMan,
      description:
        "For at resultatet skal bli pålitelig, skal du ikke ta denne testen når du er syk.",
      current: true,
      buttons: [
        {
          title: "Jeg er forkjølet",
          onPress: () =>
            showCustomPage({
              title: "",
              image: thumbsUp,
              description:
                "Vi sender deg en ny invitasjon ved neste arbeidsperiode.",
              current: true,
              buttons: [
                {
                  title: "Hjem",
                  onPress: () => navigation.navigate("DefaultRoute"),
                },
              ],
              hideIndicators: true,
            }),
          variant: "outlined",
        },
        { title: "Jeg er ikke forkjølet", onPress: () => nextPage() },
      ],
    },
    {
      title: "Husk!",
      image: adapter,
      description:
        "Husk å alltid bruke lightning adapteren som er allerede koblet til headsettet.",
      current: false,
      buttons: [{ title: "Fortsett", onPress: () => nextPage() }],
    },
    {
      title: "Bekreft utstyr",
      image: scanner,
      description:
        "For å bekrefte at du har riktig utstyr til denne testen, må du skanne strekkoden på headsettet som du får tildelt fra helsestasjonen din.",
      current: false,
      buttons: [{ title: "Skann", onPress: () => nextPage() }],
    },
    {
      title: "Skann",
      image: scanner,
      description: "Siden brukes til å skanne strekkoden.",
      current: false,
      buttons: [{ title: "Skann", onPress: () => nextPage() }],
    },
    {
      title: "Ups!",
      image: thumbsDown,
      description:
        "Ingen godkjent kode ble funnet. Du blir nå tatt tilbake til hovedsiden.",
      current: false,
      buttons: [{ title: "Skann igjen", onPress: () => previousPage() }],
    },
    {
      title: "Utstyr bekreftet",
      image: thumbsUp,
      description: "Flott! Du har et godkjent headset.",
      current: false,
      buttons: [{ title: "Fortsett", onPress: () => nextPage() }],
    },
    {
      title: "Husk å sett på headsettet ordentlig",
      image: headset,
      description:
        "Det er fort gjort å sette headsettet feil vei, husk å ha kabelen på riktig side.",
      current: false,
      buttons: [{ title: "Fortsett", onPress: () => nextPage() }],
    },
    {
      title: "Tid for hørselstest!",
      image: headset,
      description:
        "Én lyd på venstre side, én lyd på høyre side. Vær oppmerksom for å være sikker på at den blir hørt og fungerer.",
      current: false,
      buttons: [{ title: "Fortsett", onPress: () => nextPage() }],
    },
  ]);

  const getCurrentPageIndex = () => pages.findIndex((page) => page.current);

  const showCustomPage = (customPage: PreTestPage) => {
    const currentIndex = getCurrentPageIndex();
    setPages(
      pages.map((page, index) => {
        if (index === currentIndex) page = customPage;
        return page;
      })
    );
  };

  const previousPage = () => {
    const currentIndex = getCurrentPageIndex();
    const previousIndex = currentIndex - 1;
    setPages(
      pages.map((page, index) => {
        if (index === previousIndex) page.current = true;
        if (index === currentIndex) page.current = false;
        return page;
      })
    );
  };

  const nextPage = (indexChange = 1) => {
    const currentIndex = getCurrentPageIndex();
    const nextIndex = currentIndex + indexChange;
    if (nextIndex < pages.length) {
      setPages(
        pages.map((page, index) => {
          if (index === currentIndex) page.current = false;
          else if (index === nextIndex) page.current = true;
          return page;
        })
      );
    } else {
      navigation.navigate("SoundCheckRoute");
    }
  };

  const getCurrentPage = () => pages.find((page) => page.current)!;

  const page = getCurrentPage();

  return { page, pages, nextPage };
};
