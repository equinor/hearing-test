import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { msalInit } from "mad-expo-core";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

import equinorBold from "../assets/fonts/Equinor-Bold.ttf";
import equinorBoldItalic from "../assets/fonts/Equinor-BoldItalic.ttf";
import equinorItalic from "../assets/fonts/Equinor-Italic.ttf";
import equinorLight from "../assets/fonts/Equinor-Light.ttf";
import equinorLightItalic from "../assets/fonts/Equinor-LightItalic.ttf";
import equinorMedium from "../assets/fonts/Equinor-Medium.ttf";
import equinorMediumItalic from "../assets/fonts/Equinor-MediumItalic.ttf";
import equinorRegular from "../assets/fonts/Equinor-Regular.ttf";
import {
  AzureADRedirectUrl,
  AzureADRedirectUrlWeb,
  AzureADClientId,
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
          "Equinor-Bold": equinorBold,
          "Equinor-BoldItalic": equinorBoldItalic,
          "Equinor-Italic": equinorItalic,
          "Equinor-Light": equinorLight,
          "Equinor-LightItalic": equinorLightItalic,
          "Equinor-Medium": equinorMedium,
          "Equinor-MediumItalic": equinorMediumItalic,
          "Equinor-Regular": equinorRegular,
        });

        await msalInit(
          AzureADClientId,
          Platform.OS === "web" ? AzureADRedirectUrlWeb : AzureADRedirectUrl
        );
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
