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
import IconButton from "../components/common/EDS/IconButton";
import Card from "../components/common/atoms/Card";
import NavigationItem from "../components/common/atoms/NavigationItem";
import Typography from "../components/common/atoms/Typography";
import { SlideModal } from "../components/common/molecules/SlideModal";
import TestResultsModal from "../components/common/molecules/TestResultsModal";
import { STOP } from "../constants/colors";
import { fetchMe } from "../services/api/api-methods";
import { appStartupInit } from "../store/test/actions";
import { selectError } from "../store/test/reducer";
import { FORMS_URL } from "./TestResultScreen";

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
    locationModalVisible: false,
  };

  componentDidMount() {
    fetchMe()
      .then((response) => {
        this.setState({
          firstName: response.firstName,
          location: response.location,
        });
      })
      .catch(() => {
        this.setState({
          firstName: null,
          location: null,
        });
      });
  }

  setTestResultsModalVisible = (value: boolean) => {
    this.setState({ testResultsModalVisible: value });
  };

  setLocationModalVisible = (value: boolean) => {
    this.setState({ locationModalVisible: value });
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
            style={{
              marginHorizontal: 4,
              marginBottom: -10,
            }}
          >
            Hei {this.state.firstName ? this.state.firstName : ""},
          </Typography>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 4,
              marginBottom: 18,
            }}
          >
            <Typography variant="h2">
              Din lokasjon er {this.state.location || "ukjent"}
            </Typography>
            <IconButton
              icon="help"
              onPress={() => this.setLocationModalVisible(true)}
              style={{
                position: "relative",
                left: -8,
                marginBottom: 4,
              }}
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
            style={{ marginTop: 32, marginHorizontal: 4, marginBottom: 16 }}
          >
            Din oversikt
          </Typography>
          {/* NOT AVAILABLE YET: <NavigationItem title="Informasjon om testen" /> */}
          <NavigationItem
            onPress={() => this.setTestResultsModalVisible(true)}
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
          setInvisible={() => this.setTestResultsModalVisible(false)}
        />
        <SlideModal
          title="Lokasjon"
          visible={this.state.locationModalVisible}
          setInvisible={() => this.setLocationModalVisible(false)}
        >
          <Typography variant="p">
            Du kan oppdatere lokasjonen din i SAP.
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
