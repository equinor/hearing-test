/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { MaterialIcons as Icon } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, ReleaseNoteScreen, SettingsScreen } from "mad-expo-core";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import LinkingConfiguration from "./LinkingConfiguration";
import withUtilities from "./utils";
import appJson from "../app.json";
import logo from "../assets/images/logo.png";
import { SETTINGS_CONFIG } from "../configs/SettingsConfig";
import { EQUINOR_GREEN } from "../constants/colors";
import { getEnvironment, getScopes } from "../constants/settings";
import { AboutScreen } from "../screens/AboutScreen";
import { DefaultScreen } from "../screens/DefaultScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PreTestScreen from "../screens/PreTestScreen";
import SoundCheckFinishedScreen from "../screens/SoundCheckFinishedScreen";
import SoundCheckScreen from "../screens/SoundCheckScreen";
import TestResultScreen from "../screens/TestResultScreen";
import TestScreen from "../screens/TestScreen";
import { setConfig } from "../store";
import store from "../store/config";
import { RootStackParamList } from "../types";

const environment = getEnvironment();

const getIsDemoMode = () => store.getState().appConfig.isDemoMode;

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#F7F7F7",
    card: "#F7F7F7",
    primary: EQUINOR_GREEN,
  },
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : LightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName="LoginRoute"
      screenOptions={{
        headerTitleStyle: { color: "black" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="LoginRoute"
        children={({ navigation }) => (
          <LoginScreen
            logo={logo}
            mainRoute="ReleaseNoteRoute"
            navigation={navigation}
            scopes={getScopes("hearing")}
            eds
            title="Hørselstest"
            showDemoButton
            onDemoPress={() => {
              dispatch(setConfig({ key: "isDemoMode", value: true }));
              navigation.navigate("ReleaseNoteRoute");
            }}
          />
        )}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="ReleaseNoteRoute"
        children={({ navigation }) => (
          <ReleaseNoteScreen
            name="HearingTest"
            version={appJson.expo.version}
            environment={environment}
            scopes={getScopes("mad")}
            navigation={navigation}
            versionStorageKey="version"
            redirectRoute="DefaultRoute"
            demoMode={getIsDemoMode()}
          />
        )}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="DefaultRoute"
        component={withUtilities(DefaultScreen)}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerBackVisible: false,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              testID="ButtonSettings"
              onPress={() => navigation.navigate("SettingsRoute")}
              style={{ paddingHorizontal: 15 }}
            >
              <Icon name="more-vert" color={EQUINOR_GREEN} size={24} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="PreTestRoute"
        component={withUtilities(PreTestScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="SoundCheckRoute"
        component={withUtilities(SoundCheckScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="SoundCheckFinishedRoute"
        component={withUtilities(SoundCheckFinishedScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="TestRoute"
        component={withUtilities(TestScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="TestResultRoute"
        component={withUtilities(TestResultScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="SettingsRoute"
          children={({ navigation }) => (
            <SettingsScreen
              config={SETTINGS_CONFIG}
              routeAfterLogout="LoginRoute"
              navigation={navigation}
              onLogout={() =>
                dispatch(setConfig({ key: "isDemoMode", value: false }))
              }
              languageCode="no"
            />
          )}
          options={{
            title: "Innstillinger",
          }}
        />
        <Stack.Screen
          name="FeedbackRoute"
          component={withUtilities(FeedbackScreen)}
          options={{
            title: "Feedback",
          }}
        />
        <Stack.Screen
          name="AboutRoute"
          component={withUtilities(AboutScreen)}
          options={{
            title: "About",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
