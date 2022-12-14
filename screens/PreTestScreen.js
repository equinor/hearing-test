import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import adapter from "../assets/images/adapter.png";
import headsetVH from "../assets/images/headset-v-h.png";
import manWithHeadsetVH from "../assets/images/man-with-headset-v-h.png";
import scanner from "../assets/images/scanner.png";
import sickMan from "../assets/images/sick-man.png";
import thumbsDown from "../assets/images/thumbs-down.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import ButtonEDS from "../components/common/EDS/Button";
import Typography from "../components/common/atoms/Typography";
import Indicators from "../components/common/molecules/Indicators";
import { BarCodeScannerScreen } from "./BarCodeScannerScreen";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    padding: 54,
    paddingTop: 80,
  },
});

export default class PreTestScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    pages: [
      {
        title: "Er du forkjølet?",
        content:
          "For at resultatene skal bli pålitelige, skal du ikke ta denne testen når du er syk.",
        current: true,
        done: false,
        image: sickMan,
        buttons: [
          { text: "Jeg er ikke forkjølet", onPress: () => this.nextPage() },
          {
            text: "Jeg er forkjølet",
            outlined: true,
            onPress: () =>
              this.showCustomPage({
                title: "",
                content:
                  "Vi sender deg en ny invitasjon ved neste arbeidsperiode.",
                current: true,
                done: true,
                image: thumbsUp,
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
        ],
      },
      {
        title: "Husk!",
        content:
          "Husk å alltid bruke lightning adapteren som er allerede koblet til headsettet.",
        current: false,
        done: false,
        image: adapter,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
      {
        title: "Bekreft utstyr",
        content:
          "For å bekrefte at du har riktig utstyr til denne testen, må du scanne strekkoden på headsettet som du får tildelt fra helsestasjonen din.",
        current: false,
        done: false,
        image: scanner,
        buttons: [{ text: "Scan", onPress: () => this.nextPage() }],
      },
      {
        title: "Scan",
        content: "Page used to scan barcode",
        current: false,
        done: false,
        image: scanner,
        buttons: [{ text: "Scan", onPress: () => this.nextPage() }],
      },
      {
        title: "Ups!",
        content:
          "Ingen godkjent kode ble funnet. Du blir nå tatt tilbake til hovedsiden.",
        current: false,
        done: false,
        image: thumbsDown,
        buttons: [{ text: "Scan igjen", onPress: () => this.previousPage() }],
      },
      {
        title: "Utstyr bekreftet",
        content: "Flott! Du har et godkjent headset.",
        current: false,
        done: false,
        image: thumbsUp,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
      {
        title: "Husk å sett på headsettet ordentlig.",
        content:
          "Det er fort gjort å sette headsettet feil vei, husk å ha kabelen på riktig side!",
        current: false,
        done: false,
        image: headsetVH,
        buttons: [{ text: "Scan", onPress: () => this.nextPage() }],
      },
      {
        title: "Tid for hørselstest!",
        content:
          "Én lyd på venstre side, én lyd på høyre side. Vær oppmerksom for å være sikker på at den blir hørt og fungerer.",
        current: false,
        done: false,
        image: manWithHeadsetVH,
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

  nextPage(indexChange) {
    if (typeof indexChange === "undefined") {
      indexChange = 1;
    }

    const currentIndex = this.state.pages.findIndex((page) => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    clonedPages[currentIndex].done = true;
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
          onFailure={() => this.nextPage()}
          onSuccess={() => this.nextPage(2)}
        />
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.component}>
          <View style={{ display: "flex", height: "100%" }}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={view.image}
                style={{ height: 250, resizeMode: "contain" }}
              />
            </View>
            <View style={{ marginTop: 32 }}>
              <Typography
                variant="h2"
                style={{ textAlign: "center", paddingBottom: 8 }}
              >
                {view.title}
              </Typography>
              <Typography
                variant="p"
                style={{ textAlign: "center", height: 18 * 4 }}
                numberOfLines={4}
              >
                {view.content}
              </Typography>
            </View>
            {view.ignoreStep ? (
              <></>
            ) : (
              <View style={{ height: 80, justifyContent: "center" }}>
                <Indicators iterable={this.state.pages} />
              </View>
            )}
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column-reverse",
                justifyContent: "flex-start",
                paddingBottom: 32,
              }}
            >
              {view.buttons.map(({ onPress, text, outlined }) => {
                return (
                  <ButtonEDS
                    text={text}
                    onPress={onPress}
                    key={text}
                    outlined={outlined}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
