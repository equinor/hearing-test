import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, TextInput, View, SafeAreaView, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";

import {
  BuildConfiguration,
  getConfiguredResources,
  getResource,
} from "../../constants/settings";
import { authenticateSilently } from "../../services/adal";
import { getCurrentUser } from "../../store/auth";
import MadButton from "../components/common/atoms/MadButton";
import Spinner from "../components/common/atoms/Spinner";
import * as colors from "../stylesheets/colors";
import textStyle from "../stylesheets/text";

const navBarTitle = "Feedback";

const styles = StyleSheet.create({
  systemInfoText: {
    ...textStyle.p,
    textAlign: "justify",
    lineHeight: 23,
  },
});

class FeedbackPage extends Component {
  static navigationOptions = () => ({
    title: navBarTitle,
  });

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    isBusy: false,
    feedbackText: "",
    statusMessage: "",
    status: "",
  };

  updateFeedback = (feedbackText) => {
    this.setState({ feedbackText });
  };

  createUrl = (resource, path) => `${getResource(resource).ApiBaseUrl}${path}`;

  postData = (path, data, onSuccess, onError) =>
    authenticateSilently("mad").then((r) =>
      fetch(this.createUrl("mad", path), {
        method: "POST",
        body: JSON.stringify(data),
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${r.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            onSuccess(response.text);
          }
          this.setState({ isBusy: false });
        })
        .catch((err) => {
          onError(err);
        })
    );

  sendFeedback = (Product, User, Msg, SystemMsg) => {
    this.setState({ isBusy: true, statusMessage: "" });

    this.postData(
      "/Feedback",
      {
        Product,
        User,
        Msg,
        SystemMsg,
      },
      // success
      () => {
        this.setState({
          isBusy: false,
          feedbackText: "",
          statusMessage: "Thank you for the feedback!",
          status: "OK",
        });
      },
      // error
      () => {
        this.setState({
          isBusy: false,
          statusMessage: "Failed to post feedback. Please try again later.",
          status: "ERROR",
        });
      }
    );
  };

  render() {
    const { user } = this.props;
    const { isBusy } = this.state;
    const resources = getConfiguredResources();
    const getApiEndpoints = () =>
      resources
        .map((resource) => getResource(resource).ApiBaseUrl.toString())
        .join("\n - ");
    const userId = user.displayableId ? user.displayableId : user.userId;
    const environment = BuildConfiguration;
    const apiEndpoints = getApiEndpoints();

    if (isBusy) return <Spinner />;

    const device = {
      brand: `${DeviceInfo.getBrand()}`,
      id: `${DeviceInfo.getDeviceId()}`,
      os: `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
      timeZone: `${DeviceInfo.getTimezone()}`,
      locale: `${DeviceInfo.getDeviceLocale()}`,
    };

    const items = [
      { key: "User", value: userId },
      { key: "Device brand", value: device.brand },
      { key: "Device id", value: device.id },
      { key: "Operation System", value: device.os },
      { key: "TimeZone", value: device.timeZone },
      { key: "Locale", value: device.locale },
    ].map((item) => (
      <View
        key={item.key}
        style={{ flexDirection: "row", alignContent: "center" }}
      >
        <Text style={[styles.systemInfoText, { width: 180 }]}>
          - {item.key}:
        </Text>
        <Text style={styles.systemInfoText}>{item.value}</Text>
      </View>
    ));

    const { feedbackText, statusMessage, status } = this.state;
    return (
      <KeyboardAwareScrollView
        getTextInputRefs={() => {
          return [this.textInputRef];
        }}
      >
        <SafeAreaView
          style={{ marginLeft: 42, marginRight: 42, margin: 16, flex: 1 }}
        >
          {!!statusMessage && (
            <View
              style={{
                borderRadius: 4,
                padding: 16,
                marginBottom: 6,
                backgroundColor: status === "OK" ? colors.GO : colors.STOP,
              }}
            >
              <Text style={[textStyle.h3, { color: "white" }]}>
                {statusMessage}
              </Text>
            </View>
          )}
          <Text style={textStyle.h1}>Have some feedback?</Text>
          <Text style={[textStyle.p, { lineHeight: 23 }]}>
            We are collecting some information about your device as a part of
            the feedback-process. By submitting you agree to share the following
            info:
          </Text>
          <View style={{ paddingTop: 16, paddingBottom: 8 }}>{items}</View>
          <TextInput
            testID="InputFeedback"
            ref={(ref) => {
              this.textInputRef = ref;
            }}
            value={feedbackText}
            editable
            multiline
            placeholder="Write your feedback here"
            onChangeText={(text) => this.updateFeedback(text)}
            style={[
              textStyle.p,
              {
                minHeight: 150,
                borderWidth: 1,
                borderColor: "gray",
                backgroundColor: "white",
                borderRadius: 4,
                paddingTop: 16,
                padding: 16,
                marginTop: 16,
                marginBottom: 16,
              },
            ]}
          />
          <MadButton
            text="Send"
            active={feedbackText.trim().length > 0}
            onPress={() => {
              this.sendFeedback(
                `${DeviceInfo.getApplicationName()} | v${DeviceInfo.getReadableVersion()} (${DeviceInfo.getBuildNumber()})`,
                ` ${userId}`,
                `${feedbackText.trim()}`,
                "\n\n" +
                  `*Device brand:* ${device.brand}\n` +
                  `*Device Id:* ${device.id}\n` +
                  `*Operation System:* ${device.os}\n` +
                  `*TimeZone:* ${device.timeZone}\n` +
                  `*Locale:* ${device.locale}\n` +
                  `*Environment:* ${environment}\n` +
                  `\n*Api Endpoints:*\n - ${apiEndpoints}`
              );
            }}
            testID="SubmitFeedbackButton"
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: getCurrentUser(state),
});

export default connect(mapStateToProps)(FeedbackPage);
