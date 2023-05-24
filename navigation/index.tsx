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
import { ReleaseNoteScreen } from "mad-expo-core";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import withUtilities from "./utils";
import appJson from "../app.json";
import { EQUINOR_GREEN } from "../constants/colors";
import { getEnvironment, getScopes } from "../constants/settings";
import { AboutScreen } from "../screens/AboutScreen";
import { DefaultScreen } from "../screens/DefaultScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PreTestScreen from "../screens/PreTestScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SoundCheckFinishedScreen from "../screens/SoundCheckFinishedScreen";
import SoundCheckScreen from "../screens/SoundCheckScreen";
import TestResultScreen from "../screens/TestResultScreen";
import TestScreen from "../screens/TestScreen";
import store from "../store/config";
import { RootStackParamList } from "../types";

const environment = getEnvironment();

const getIsDemoMode = () => store.getState().appConfig.current.demoMode;

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
        component={LoginScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="FeatureRoute"
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
        options={({ navigation }: any) => ({
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
        options={{ title: "Ups!" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="SettingsRoute"
          component={SettingsScreen}
          options={{
            headerBackTitle: "Hjem",
            title: "Konto",
          }}
        />
        <Stack.Screen
          name="FeedbackRoute"
          component={withUtilities(FeedbackScreen)}
          options={{
            title: "Tilbakemelding",
          }}
        />
        <Stack.Screen
          name="AboutRoute"
          component={withUtilities(AboutScreen)}
          options={{
            title: "Om",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
