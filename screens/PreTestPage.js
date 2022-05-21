import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

import headset from "../assets/images/headset.png";
import manWithHeadset from "../assets/images/man-with-headset.png";
import sickMan from "../assets/images/sick-man.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import ButtonEDS from "../components/common/EDS/Button";
import Typography from "../components/common/atoms/Typography";
import Indicators from "../components/common/molecules/Indicators";
import { GRAY_BACKGROUND } from "../constants/colors";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
    padding: 54,
    paddingTop: 80,
  },
});

export default class PreTestPage extends Component {
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
          { text: "Fortsett", onPress: () => this.nextPage() },
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
        title: "Utstyr",
        content:
          "Du trenger et godkjent headset for å utføre testen. Dette kobles til din mobile enhet. Blå skal på venstre øre og rød skal på høyre øre.",
        current: false,
        done: false,
        image: headset,
        buttons: [{ text: "Fortsett", onPress: () => this.nextPage() }],
      },
      {
        title: "Testen",
        content:
          "Appen vil foreta 1 måleserie. Ved forstyrrelser er det mulig å pause testen og fortsette der du slapp.",
        current: false,
        done: false,
        image: manWithHeadset,
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

  nextPage() {
    const currentIndex = this.state.pages.findIndex((page) => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    clonedPages[currentIndex].done = true;
    if (currentIndex + 1 < this.state.pages.length) {
      clonedPages[currentIndex].current = false;
      clonedPages[currentIndex + 1].current = true;
      this.setState({ pages: clonedPages });
    } else {
      this.props.navigation.navigate("SoundCheckRoute");
    }
  }

  render() {
    const view = this.currentPage();
    return (
      <View style={styles.component}>
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
      </View>
    );
  }
}
