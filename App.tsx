import "react-native-gesture-handler";
import { EDSProvider, useEDS } from "@equinor/mad-components";
import { StatusBar } from "expo-status-bar";
import { ServiceMessage } from "mad-expo-core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { getEnvironment } from "./constants/settings";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store/config";
import { EnvironmentBanner } from "./utils/EnvironmentBanner";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [hasLoadedEds] = useEDS();

  if (!isLoadingComplete || !hasLoadedEds) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <ServiceMessage
            serviceName="HearingTest"
            environment={getEnvironment()}
            languageCode="no"
          />
          <EnvironmentBanner />
          <EDSProvider colorScheme="light" density="phone">
            <Navigation colorScheme="light" />
            <StatusBar style="dark" />
          </EDSProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
