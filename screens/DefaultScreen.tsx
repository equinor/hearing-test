import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";

import ButtonEDS from "../components/common/EDS/Button";
import Card from "../components/common/atoms/Card";
import IconButton from "../components/common/EDS/IconButton";
import NavigationItem from "../components/common/atoms/NavigationItem";
import Typography from "../components/common/atoms/Typography";
import TestResultsModal from "../components/common/molecules/TestResultsModal";
import { STOP } from "../constants/colors";
import { fetchMe } from "../services/api/api-methods";
import { appStartupInit } from "../store/test/actions";
import { selectError } from "../store/test/reducer";
import { FORMS_URL } from "./TestResultScreen";
import { SlideModal } from "../components/common/molecules/SlideModal";

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 24,
  },
});

class DefaultScreen extends Component<{
  actionAppInit: Function;
  error?: any;
}> {
  static propTypes = {
    actionAppInit: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  };

  state = {
    firstName: null,
    location: null,
    testResultsModalVisible: false,
    locationHelpModalVisible: false
  };

  componentDidMount() {
    fetchMe()
      .then((response) => {
        this.setState({
          firstName: response.firstName,
          location: response.location
        });
      })
      .catch(() => {
        this.setState({
          firstName: null,
          location: null
        });
      });
  }

  setModalVisible = (value: boolean) => {
    this.setState({ testResultsModalVisible: value });
  };

  setLocationHelpModalVisible = (value: boolean) => {
    this.setState({ locationHelpModalVisible: value });
  };

  render() {
    const { error, navigation } = this.props;
    if (!this.state.firstName) return <></>;
    return (
      <ScrollView style={{ flex: 1 }}>
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
                Could not init the app due to
              </Text>
              <Text style={{ fontSize: 23, color: "white", marginVertical: 4 }}>
                ERROR: {error.status} {error.message && `| ${error.message}`}
              </Text>
              <Text style={{ color: "white" }}>Click to learn more...</Text>
            </>
          </TouchableHighlight>
        )}
        <View style={styles.component}>
          <Typography
            variant="h1"
            style={{ paddingLeft: 4, marginBottom: 4 }}
          >
            Hei{this.state.firstName ? ` ${this.state.firstName}` : ""},
          </Typography>
          <View style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 4,
              marginBottom: 32,
            }}
          >
            <Typography variant="h2" style={{ marginRight: 4 }}>
              Din lokasjon er {(this.state.location || "ukjent")}
            </Typography>
            <IconButton
              icon="help"
              onPress={() => this.setLocationHelpModalVisible(true)}
              size={20}
            />
          </View>
          <Card>
            <Typography variant="h2" style={{ paddingBottom: 16 }}>
              Er du klar for en ny test?
            </Typography>
            <Typography variant="p" style={{ paddingBottom: 32 }}>
              Husk å teste hørselen din regelmessig for at vi skal kunne
              kartlegge hørselshelsen din over tid.
            </Typography>
            <View style={{ width: 160 }}>
              <ButtonEDS
                onPress={() => navigation.navigate("PreTestRoute")}
                text="Ta hørselstesten"
              />
            </View>
          </Card>
          <Typography
            variant="h2"
            style={{ paddingBottom: 16, paddingTop: 32 }}
          >
            Din oversikt
          </Typography>
          {/* NOT AVAILABLE YET: <NavigationItem title="Informasjon om testen" /> */}
          <NavigationItem
            onPress={() => this.setModalVisible(true)}
            title="Mine resultater"
          />
          <NavigationItem
            onPress={async () => {
              const supported = await Linking.canOpenURL(FORMS_URL);
              if (supported) {
                await Linking.openURL(FORMS_URL);
              } else {
                Alert.alert(`Don't know how to open this URL: ${FORMS_URL}`);
              }
            }}
            title="Gi tilbakemelding"
          />
        </View>
        <TestResultsModal
          visible={this.state.testResultsModalVisible}
          setInvisible={() => this.setModalVisible(false)}
        />
        <SlideModal
          title="Lokasjon Hjelp"
          visible={this.state.locationHelpModalVisible}
          setInvisible={() => this.setLocationHelpModalVisible(false)}
        >
          <Typography variant="p" style={{ paddingTop: 32, paddingHorizontal: 24 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </SlideModal>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  error: selectError(state),
});

const mapDispatchToProps = (dispatch) => ({
  actionAppInit: () => dispatch(appStartupInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultScreen);
