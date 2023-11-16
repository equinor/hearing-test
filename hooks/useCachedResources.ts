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
