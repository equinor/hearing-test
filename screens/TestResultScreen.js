import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableHighlight,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

import doctor from "../assets/images/doctor.png";
import thumbsUp from "../assets/images/thumbs-up.png";
import warning from "../assets/images/warning.png";
import ButtonEDS from "../components/common/EDS/Button";
import IconButton from "../components/common/EDS/IconButton";
import Typography from "../components/common/atoms/Typography";
import TestResultItem from "../components/common/molecules/TestResultItem";
import { STOP } from "../constants/colors";
import { selectError, selectTestResult } from "../store/test/reducer";

export const FORMS_URL =
  "https://forms.office.com/Pages/ResponsePage.aspx?id=NaKkOuK21UiRlX_PBbRZsC9rzeD3BlFJi0JbArgz2wRURUxPWVRWUVBPSlVYUVc5UElIQjJXMFRSWS4u";

class TestResultScreen extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    testResult: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  state = {
    modalVisible: false,
  };

  setModalVisible(bool) {
    this.setState({ modalVisible: bool });
  }

  pages = [
    {
      title: "Testen er fullført",
      image: thumbsUp,
      subTitle: "Dette ser fint ut!",
      description:
        "Du vil få en ny invitasjon om 6 måneder, men vær oppmerksom på at jo oftere du tar testen, jo bedre.",
      secondaryButton: {
        enable: false,
      },
    },
    {
      title: "Her ble det litt krøll",
      image: warning,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "For beste mulige resultater, vennligst ta hørselstesten på ny.",
      secondaryButton: {
        enable: true,
        text: "Ta ny test",
        onPress: () => this.props.navigation.navigate("TestRoute"),
      },
    },
    {
      title: "Testen er fullført",
      image: doctor,
      subTitle: "Takk for at du gjennomførte testen",
      description:
        "Det er oppdaget en endring i hørselen din. Vennligst ta kontakt med sykepleier for en manuell undersøkelse.",
      secondaryButton: {
        enable: true,
        text: "Kontakt sykepleier",
        onPress: () => {
          /* TODO */
        },
      },
    },
    {
      title: "Testen er fullført",
      image: thumbsUp,
      subTitle: "Takk for at du testet appen!",
      description: "Vennligst trykk på knappen under for å gi tilbakemelding",
      secondaryButton: {
        enable: true,
        text: "Se resultater",
        onPress: () => {
          this.setModalVisible(true);
        },
      },
    },
  ];

  // Feedback page
  page = this.pages[3]; // TODO in the future, the backend will probably decide which page to show

  render() {
    const { error, testResult } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, width: "100%" }}>
          {error && error.status && (
            <TouchableHighlight
              style={{ backgroundColor: STOP, padding: 12, margin: 0 }}
              onPress={() =>
                Linking.openURL(
                  `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`
                )
              }
            >
              <>
                <Text style={{ color: "white" }}>
                  Could not submit test due to
                </Text>
                <Text
                  style={{ fontSize: 23, color: "white", marginVertical: 4 }}
                >
                  ERROR: {error.status} {error.message && `| ${error.message}`}
                </Text>
                <Text style={{ color: "white" }}>Click to learn more...</Text>
              </>
            </TouchableHighlight>
          )}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              width: "100%",
              padding: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 36,
                paddingTop: 12,
              }}
            >
              <IconButton
                icon="close"
                onPress={() =>
                  Alert.alert(
                    "Avslutte?",
                    "Du kan fortsatt se resultatene dine fra startsiden.",
                    [
                      {
                        text: "Avbryt",
                        onPress: () => {},
                        style: "default",
                      },
                      {
                        text: "Bekreft",
                        onPress: () =>
                          this.props.navigation.navigate("DefaultRoute"),
                        style: "default",
                      },
                    ]
                  )
                }
              />
              <Typography variant="h1">{this.page.title}</Typography>
              <View style={{ width: 48, height: 48 }} />
            </View>
            {/*  Results-header section */}
            <Image
              source={this.page.image}
              style={{ height: 250, resizeMode: "contain", marginBottom: 24 }}
            />
            <Typography variant="h2">{this.page.subTitle}</Typography>
            <Typography
              variant="p"
              style={{
                margin: 12,
                paddingHorizontal: 36,
                textAlign: "center",
              }}
            >
              {this.page.description}
            </Typography>
          </View>
          <View
            style={{
              flex: 1,
              marginBottom: 40,
              flexDirection: "column-reverse",
              justifyContent: "flex-start",
              padding: 12,
            }}
          >
            {/*  Buttons-section */}

            {this.page.secondaryButton.enable ? (
              <ButtonEDS
                onPress={this.page.secondaryButton.onPress}
                text={this.page.secondaryButton.text}
                outlined
              />
            ) : (
              <></>
            )}
            <ButtonEDS
              onPress={async () => {
                const supported = await Linking.canOpenURL(FORMS_URL);
                if (supported) {
                  await Linking.openURL(FORMS_URL);
                } else {
                  Alert.alert(`Don't know how to open this URL: ${FORMS_URL}`);
                }
              }}
              text="Gi tilbakemelding" // "Se resultater"
              outlined={false}
              small={false}
              danger={false}
            />
          </View>
          <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent
            visible={this.state.modalVisible}
            onDismiss={() => this.setModalVisible(false)}
            onRequestClose={() => this.setModalVisible(false)}
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
              <IconButton
                icon="close"
                onPress={() => this.setModalVisible(false)}
              />
            </View>
            <TestResultItem
              data={testResult}
              resetSelectedItem={() => {}}
              hideTop
            />
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => ({
  error: selectError(state),
  testResult: selectTestResult(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultScreen);
