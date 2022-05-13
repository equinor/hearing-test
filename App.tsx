import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import AppContainer from "./components/common/atoms/AppContainer";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store/config";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContainer>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme="light" />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </AppContainer>
    );
  }
}
