import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { appInsightsInit, msalInit } from "mad-expo-core";
import { useEffect, useState } from "react";

import {
  ApplicationInsightsInstrumentationKey,
  AzureADClientId,
  AzureADRedirectUrl,
} from "../constants/settings";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...MaterialIcons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "Equinor-Bold": require("../assets/fonts/Equinor-Bold.ttf"),
          "Equinor-BoldItalic": require("../assets/fonts/Equinor-BoldItalic.ttf"),
          "Equinor-Italic": require("../assets/fonts/Equinor-Italic.ttf"),
          "Equinor-Light": require("../assets/fonts/Equinor-Light.ttf"),
          "Equinor-LightItalic": require("../assets/fonts/Equinor-LightItalic.ttf"),
          "Equinor-Medium": require("../assets/fonts/Equinor-Medium.ttf"),
          "Equinor-MediumItalic": require("../assets/fonts/Equinor-MediumItalic.ttf"),
          "Equinor-Regular": require("../assets/fonts/Equinor-Regular.ttf"),
        });

        await msalInit(AzureADClientId, AzureADRedirectUrl);

        appInsightsInit({
          instrumentationKey: ApplicationInsightsInstrumentationKey,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
