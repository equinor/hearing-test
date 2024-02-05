import { useEDS } from "@equinor/mad-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [hasLoadedEds] = useEDS();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsFontsLoaded(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    if (isFontsLoaded && hasLoadedEds) {
      setLoadingComplete(true);
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, hasLoadedEds]);

  return isLoadingComplete;
}
