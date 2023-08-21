import { cloneDeep } from "lodash";
import { Typography } from "mad-expo-core";
import PropTypes from "prop-types";
import { Component } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BarCodeScannerScreen } from "./BarCodeScannerScreen";
import adapter from "../assets/images/adapter.png";
import headset from "../assets/images/headset.png";
import scanner from "../assets/images/scanner.png";
import sickMan from "../assets/images/sick-man.png";
import thumbsDown from "../assets/images/thumbs-down.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import ButtonEDS from "../components/common/EDS/Button";
import { IconButton } from "../components/common/EDS/IconButton";
import { Indicators } from "../components/common/molecules/Indicators";
import { MOSS_GREEN_100, TEXT } from "../constants/colors";
import { confirmationDialog } from "../utils/alerts";

export default class PreTestScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    pages: [
      {
        title: "Er du forkjølet?",
        image: sickMan,
        content:
          "For at resultatene skal bli pålitelige, skal du ikke ta denne testen når du er syk.",
        current: true,
        buttons: [
          {
            text: "Jeg er forkjølet",
            outlined: true,
            onPress: () =>
              this.showCustomPage({
                title: "",
                image: thumbsUp,
                content:
                  "Vi sender deg en ny invitasjon ved neste arbeidsperiode.",
                current: true,
                ignoreStep: true,
                buttons: [
                  {
                    text: "Hjem",
                    onPress: () =>
                      this.props.navigation.navigate("DefaultRoute"),
                  },
                ],
              }),
          },
          { text: "Jeg er ikke forkjølet", onPress: () => this.nextPage() },
        ],
      },
      {
        title: "Husk!",
        image: adapter,
        content:
          "Husk å alltid bruke lightning adapteren som er allerede koblet til headsettet.",
        current: false,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
      {
        title: "Bekreft utstyr",
        image: scanner,
        content:
          "For å bekrefte at du har riktig utstyr til denne testen, må du scanne strekkoden på headsettet som du får tildelt fra helsestasjonen din.",
        current: false,
        buttons: [{ text: "Scan", onPress: () => this.nextPage() }],
      },
      {
        title: "Scan",
        image: scanner,
        content: "Page used to scan barcode",
        current: false,
        hideIndicator: true,
        buttons: [{ text: "Scan", onPress: () => this.nextPage() }],
      },
      {
        title: "Ups!",
        image: thumbsDown,
        content:
          "Ingen godkjent kode ble funnet. Du blir nå tatt tilbake til hovedsiden.",
        current: false,
        buttons: [{ text: "Scan igjen", onPress: () => this.previousPage() }],
      },
      {
        title: "Utstyr bekreftet",
        image: thumbsUp,
        content: "Flott! Du har et godkjent headset.",
        current: false,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
      {
        title: "Husk å sett på headsettet ordentlig.",
        image: headset,
        content:
          "Det er fort gjort å sette headsettet feil vei, husk å ha kabelen på riktig side!",
        current: false,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
      {
        title: "Tid for hørselstest!",
        image: headset,
        content:
          "Én lyd på venstre side, én lyd på høyre side. Vær oppmerksom for å være sikker på at den blir hørt og fungerer.",
        current: false,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
    ],
  };

  showCustomPage(customPage) {
    const currentIndex = this.state.pages.findIndex((page) => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    clonedPages[currentIndex] = customPage;
    this.setState({ pages: clonedPages });
  }

  currentPage() {
    return this.state.pages.find((page) => page.current);
  }

  nextPage(indexChange = 1) {
    const currentIndex = this.state.pages.findIndex((page) => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    if (currentIndex + indexChange < this.state.pages.length) {
      clonedPages[currentIndex].current = false;
      clonedPages[currentIndex + indexChange].current = true;
      this.setState({ pages: clonedPages });
    } else {
      this.props.navigation.navigate("SoundCheckRoute");
    }
  }

  previousPage() {
    const currentIndex = this.state.pages.findIndex((page) => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    clonedPages[currentIndex].current = false;
    clonedPages[currentIndex - 1].current = true;
    this.setState({ pages: clonedPages });
  }

  render() {
    const view = this.currentPage();
    if (view.title === "Scan") {
      return (
        <BarCodeScannerScreen
          navigation={this.props.navigation}
          onBarcodeMatch={() => this.nextPage(2)}
          onBarcodeMismatch={() => this.nextPage()}
        />
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <IconButton
            icon="close"
            onPress={() =>
              confirmationDialog(
                "Avslutte?",
                "Da må du begynne på nytt neste gang",
                () => {
                  this.props.navigation.navigate("DefaultRoute");
                }
              )
            }
            style={styles.closeButton}
          />
          <Typography variant="h1" color={MOSS_GREEN_100} style={styles.title}>
            {view.title}
          </Typography>
          <Image source={view.image} style={styles.image} />
          {view.ignoreStep ? null : (
            <Indicators iterable={this.state.pages} style={styles.indicators} />
          )}
          <Typography
            numberOfLines={4}
            size={18}
            color={TEXT}
            style={styles.content}
          >
            {view.content}
          </Typography>
          {view.buttons.map(({ onPress, outlined, text }) => (
            <ButtonEDS
              key={text}
              onPress={onPress}
              outlined={outlined}
              text={text}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
    alignItems: "center",
  },
  closeButton: { alignSelf: "flex-end", marginBottom: 16 },
  title: { textAlign: "center", marginBottom: 40 },
  image: { height: 250, resizeMode: "contain", alignSelf: "center" },
  indicators: { marginVertical: 32 },
  content: {
    textAlign: "center",
    marginBottom: 32,
    height: 24 * 4,
    lineHeight: 24,
  },
});
