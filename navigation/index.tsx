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
import * as React from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";

import AboutPage from "../app/containers/AboutPage";
import DefaultPage from "../app/containers/DefaultPage";
import FeaturePage from "../app/containers/FeaturePage";
import FeedbackPage from "../app/containers/FeedbackPage";
import LoginPage from "../app/containers/LoginPage";
import PreTestPage from "../app/containers/PreTestPage";
import SettingsPage from "../app/containers/SettingsPage";
import SoundCheckFinishedPage from "../app/containers/SoundCheckFinishedPage";
import SoundCheckPage from "../app/containers/SoundCheckPage";
import TestPage from "../app/containers/TestPage";
import TestResultPage from "../app/containers/TestResultPage";
import withUtilities from "../app/navigation/utils";
import { EQUINOR_GREEN } from "../app/stylesheets/colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
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
        headerTintColor: EQUINOR_GREEN,
      }}
    >
      <Stack.Screen
        name="LoginRoute"
        component={withUtilities(LoginPage)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FeatureRoute"
        component={withUtilities(FeaturePage)}
      />
      <Stack.Screen
        name="DefaultRoute"
        component={withUtilities(DefaultPage)}
        options={({ navigation }: any) => ({
          headerRight: () => (
            <TouchableOpacity
              testID="ButtonSettings"
              onPress={() => navigation.navigate("SettingsRoute")}
              style={{ paddingHorizontal: 15 }}
            >
              <Icon name="more-vert" color={EQUINOR_GREEN} size={24} />
            </TouchableOpacity>
          ),
          headerBackVisible: false,
          headerTitle: "",
        })}
      />
      <Stack.Screen
        name="PreTestRoute"
        component={withUtilities(PreTestPage)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="SoundCheckRoute"
        component={withUtilities(SoundCheckPage)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="SoundCheckFinishedRoute"
        component={withUtilities(SoundCheckFinishedPage)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="TestRoute"
        component={withUtilities(TestPage)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="TestResultRoute"
        component={withUtilities(TestResultPage)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="SettingsRoute"
          component={withUtilities(SettingsPage)}
          options={{
            headerTintColor: EQUINOR_GREEN,
            title: "Settings",
          }}
        />
        <Stack.Screen
          name="FeedbackRoute"
          component={withUtilities(FeedbackPage)}
          options={{
            headerTintColor: EQUINOR_GREEN,
            title: "Feedback",
          }}
        />
        <Stack.Screen
          name="AboutRoute"
          component={withUtilities(AboutPage)}
          options={{
            headerTintColor: EQUINOR_GREEN,
            title: "About",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
