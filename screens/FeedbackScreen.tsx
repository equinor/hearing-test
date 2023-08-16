import * as Device from "expo-device";
import * as Localization from "expo-localization";
import {
  authenticateSilently,
  Button,
  getAccount,
  Spinner,
  Typography,
} from "mad-expo-core";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MSALAccount } from "react-native-msal";

import appJson from "../app.json";
import * as colors from "../constants/colors";
import {
  BUILD_CONFIGURATION,
  getApiEndpoints,
  getScopes,
} from "../constants/settings";
import { createUrl } from "../services/api/api-methods";

type FeedbackData = {
  product: string;
  user: string;
  msg: string;
  systemMsg: string;
};

const FeedbackScreen = () => {
  const [account, setAccount] = useState<MSALAccount>(null);
  const [feedback, setFeedback] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  useEffect(() => {
    getAccount().then((account) => {
      setAccount(account);
    });
  }, []);

  const sendFeedback = (data: FeedbackData) => {
    setIsBusy(true);
    setStatusMessage("");

    authenticateSilently(getScopes("mad")).then((r) =>
      fetch(createUrl("mad", "/feedback"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${r.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsBusy(false);
            setFeedback("");
            setStatusMessage("Thank you for the feedback!");
            setStatus("OK");
          }
        })
        .catch((err) => {
          setIsBusy(false);
          setStatusMessage(
            `Failed to post feedback. Please try again later. ${err.message}`
          );
          setStatus("ERROR");
        })
    );
  };

  if (isBusy) return <Spinner />;

  const items = [
    { key: "User", value: account?.username.split("@")[0] },
    {
      key: "Device brand",
      value: `${Platform.OS === "web" ? "Web" : Device.brand}`,
    },
    {
      key: "Device",
      value: `${Platform.OS === "web" ? getWebBrowser() : Device.modelName}`,
    },
    {
      key: "User agent",
      value: Platform.OS === "web" ? `${navigator.userAgent}` : null,
    },
    { key: "Operating System", value: `${Device.osName} ${Device.osVersion}` },
    { key: "Timezone", value: Localization.timezone },
    { key: "Locale", value: Localization.locale },
  ];

  const deviceItems = items
    .filter((item) => !(item.key === "User agent" && item.value == null))
    .map((item) => (
      <View key={item.key}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography style={{ width: 180 }}>{item.key}:</Typography>
          <Typography style={{ flex: 1 }}>{item.value}</Typography>
        </View>
        <View
          style={{
            marginVertical: 16,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "lightgray",
          }}
        />
      </View>
    ));

  const getSystemMsg = () => {
    let systemMsg = "\n\n";
    items
      .filter(
        (item) =>
          !(
            item.key === "User" ||
            (item.key === "User agent" && item.value == null)
          )
      )
      .forEach((item) => {
        systemMsg += `*${item.key}:* ${item.value}\n`;
      });
    return `${systemMsg}*Environment:* ${BUILD_CONFIGURATION}\n\n*Api Endpoints:*\n - ${getApiEndpoints()}`;
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableResetScrollToCoords={false}
      extraScrollHeight={100}
      style={{ flex: 1, padding: 20 }}
    >
      {!!statusMessage && (
        <View
          style={{
            borderRadius: 4,
            padding: 16,
            marginBottom: 16,
            backgroundColor: status === "OK" ? colors.GO : colors.STOP,
          }}
        >
          <Typography style={{ color: "white" }}>{statusMessage}</Typography>
        </View>
      )}
      <Typography variant="h1" style={{ marginBottom: 24 }}>
        Have some feedback?
      </Typography>
      <Typography style={{ lineHeight: 24 }}>
        We are collecting some information about your device as a part of the
        feedback-process. By submitting you agree to share the following info:
      </Typography>
      <View style={{ paddingTop: 24, paddingBottom: 8 }}>{deviceItems}</View>
      <TextInput
        value={feedback}
        editable
        multiline
        placeholder="Write your feedback here"
        onChangeText={(text) => setFeedback(text)}
        onFocus={() => setIsTextInputFocused(true)}
        onBlur={() => setIsTextInputFocused(false)}
        selectionColor={colors.EQUINOR_GREEN}
        style={{
          backgroundColor: "white",
          borderColor: isTextInputFocused ? colors.EQUINOR_GREEN : "lightgray",
          borderRadius: 4,
          borderWidth: isTextInputFocused ? 2 : StyleSheet.hairlineWidth,
          marginVertical: 16,
          minHeight: 150,
          paddingBottom: 6,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 6,
        }}
      />
      <Button
        title="Send"
        disabled={feedback.trim().length === 0}
        onPress={() => {
          sendFeedback({
            product: `${appJson.expo.name} | v${appJson.expo.version} (${appJson.expo.ios.buildNumber})`,
            user: ` ${account?.username.split("@")[0]}`,
            msg: `${feedback.trim()}`,
            systemMsg: getSystemMsg(),
          });
        }}
      />
    </KeyboardAwareScrollView>
  );
};

function getWebBrowser() {
  let sBrowser;
  const sUsrAg = navigator.userAgent;

  // The order matters here, and this may report false positives for unlisted browsers.

  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge (Legacy)";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (sUsrAg.indexOf("Edg") > -1) {
    sBrowser = "Microsoft Edge (Chromium)";
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    sBrowser = "unknown";
  }

  return sBrowser;
}

export default FeedbackScreen;
