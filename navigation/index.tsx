/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { Button, Typography } from "@equinor/mad-components";
import {
  createCoreStackNavigator,
  NavigationContainer,
  SettingsScreen,
} from "@equinor/mad-core";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ColorSchemeName } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import withUtilities from "./utils";
import { COLORS } from "../constants/colors";
import { config } from "../mad.config";
import { DefaultScreen } from "../screens/DefaultScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { PreTestScreen } from "../screens/PreTestScreen";
import SoundCheckFinishedScreen from "../screens/SoundCheckFinishedScreen";
import SoundCheckScreen from "../screens/SoundCheckScreen";
import { TestResultScreen } from "../screens/TestResultScreen";
import TestScreen from "../screens/TestScreen";
import { RootStackParamList } from "../types";

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#F7F7F7",
    card: "#F7F7F7",
    primary: COLORS.MOSS_GREEN_100,
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
const CoreStack = createCoreStackNavigator<RootStackParamList>(config);

function RootNavigator() {
  return (
    <CoreStack.Navigator>
      <CoreStack.Screen
        name="Root"
        component={withUtilities(DefaultScreen)}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerBackVisible: false,
          headerTitle: "",
          headerRight: () => (
            <Button.Icon
              name="dots-vertical"
              onPress={() => navigation.navigate("Settings")}
              variant="ghost"
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <CoreStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <Typography variant="h4">Innstillinger</Typography>
          ),
        }}
      />
      <CoreStack.Screen
        name="PreTestRoute"
        component={withUtilities(PreTestScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <CoreStack.Screen
        name="SoundCheckRoute"
        component={withUtilities(SoundCheckScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <CoreStack.Screen
        name="SoundCheckFinishedRoute"
        component={withUtilities(SoundCheckFinishedScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <CoreStack.Screen
        name="TestRoute"
        component={withUtilities(TestScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <CoreStack.Screen
        name="TestResultRoute"
        component={withUtilities(TestResultScreen)}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <CoreStack.Screen
        name="NotFoundRoute"
        component={NotFoundScreen}
        options={{ title: "Ups!" }}
      />
    </CoreStack.Navigator>
  );
}
