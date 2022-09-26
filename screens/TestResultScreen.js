import PropTypes from "prop-types";
import React, { Component } from "react";
import {
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
      description:
        "Du blir kontaktet av en lege dersom du har problemer med hørselen.",
      secondaryButton: {
        enable: true,
        text: "Se resultat",
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
              <Text style={{ fontSize: 23, color: "white", marginVertical: 4 }}>
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
            justifyContent: "space-between",
            padding: 24,
          }}
        >
          <Typography variant="h1">{this.page.title}</Typography>
          {/*  Results-header section */}
          <View
            style={{
              alignItems: "center",
              maxWidth: 300,
              paddingBottom: 24,
            }}
          >
            <Image
              source={this.page.image}
              style={{ height: 250, resizeMode: "contain" }}
            />
            <Typography variant="h2">{this.page.subTitle}</Typography>
            <Typography
              variant="p"
              style={{
                marginTop: 12,
                textAlign: "center",
              }}
            >
              {this.page.description}
            </Typography>
          </View>
          <View>
            {/*  Buttons-section */}
            {this.page.secondaryButton.enable ? (
              <ButtonEDS
                onPress={this.page.secondaryButton.onPress}
                text={this.page.secondaryButton.text}
                outlined
                style={{
                  marginBottom: 12,
                }}
              />
            ) : (
              <></>
            )}
            <ButtonEDS
              onPress={() => this.props.navigation.navigate("DefaultRoute")}
              text="Hovedmeny"
              style={{ marginBottom: 0 }}
            />
          </View>
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
