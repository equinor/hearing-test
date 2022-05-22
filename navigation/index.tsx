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

import { EQUINOR_GREEN } from "../constants/colors";
import AboutScreen from "../screens/AboutScreen";
import DefaultScreen from "../screens/DefaultScreen";
import FeatureScreen from "../screens/FeatureScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PreTestScreen from "../screens/PreTestScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SoundCheckFinishedScreen from "../screens/SoundCheckFinishedScreen";
import SoundCheckScreen from "../screens/SoundCheckScreen";
import TestResultScreen from "../screens/TestResultScreen";
import TestScreen from "../screens/TestScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import withUtilities from "./utils";

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
        component={withUtilities(LoginScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FeatureRoute"
        component={withUtilities(FeatureScreen)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DefaultRoute"
        component={withUtilities(DefaultScreen)}
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
        component={withUtilities(PreTestScreen)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="SoundCheckRoute"
        component={withUtilities(SoundCheckScreen)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="SoundCheckFinishedRoute"
        component={withUtilities(SoundCheckFinishedScreen)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="TestRoute"
        component={withUtilities(TestScreen)}
        options={{ headerBackVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="TestResultRoute"
        component={withUtilities(TestResultScreen)}
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
          component={withUtilities(SettingsScreen)}
          options={{
            headerTintColor: EQUINOR_GREEN,
            title: "Settings",
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen
          name="FeedbackRoute"
          component={withUtilities(FeedbackScreen)}
          options={{
            headerTintColor: EQUINOR_GREEN,
            title: "Feedback",
          }}
        />
        <Stack.Screen
          name="AboutRoute"
          component={withUtilities(AboutScreen)}
          options={{
            headerTintColor: EQUINOR_GREEN,
            title: "About",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
