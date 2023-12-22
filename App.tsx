import "react-native-gesture-handler";
import { EDSProvider, useEDS } from "@equinor/mad-components";
import { ErrorBoundary } from "@equinor/mad-core";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store/config";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [hasLoadedEds] = useEDS();

  if (!isLoadingComplete || !hasLoadedEds) {
    return null;
  } else {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <SafeAreaProvider>
            <EDSProvider colorScheme="light" density="phone">
              <Navigation colorScheme="light" />
              <StatusBar style="dark" />
            </EDSProvider>
          </SafeAreaProvider>
        </Provider>
      </ErrorBoundary>
    );
  }
}
