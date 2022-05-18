/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  CommonActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Localization from "expo-localization";
import { SettingsScreen as ExpoSettings, LoginScreen } from "mad-expo-core";
import * as React from "react";
import { ColorSchemeName, Pressable, TouchableOpacity } from "react-native";
import { withCommander } from "react-native-salute";
import { useDispatch } from "react-redux";

import * as appJSON from "../app.json";
import AboutPage from "../app/containers/AboutPage";
import DefaultPage from "../app/containers/DefaultPage";
import FeaturePage from "../app/containers/FeaturePage";
import FeedbackPage from "../app/containers/FeedbackPage";
import PreTestPage from "../app/containers/PreTestPage";
import SettingsPage from "../app/containers/SettingsPage";
import SoundCheckFinishedPage from "../app/containers/SoundCheckFinishedPage";
import SoundCheckPage from "../app/containers/SoundCheckPage";
import TestPage from "../app/containers/TestPage";
import TestResultPage from "../app/containers/TestResultPage";
import withUtilities from "../app/navigation/utils";
import { EQUINOR_GREEN } from "../app/stylesheets/colors";
import Colors from "../constants/Colors";
import * as ENVIRONMENT from "../constants/settings";
import useColorScheme from "../hooks/useColorScheme";
import logo from "../resources/images/logo.png";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import * as actions from "../store";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
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
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: { color: "black" },
        headerTitleAlign: "center",
        headerTintColor: EQUINOR_GREEN,
      }}
    >
      <Stack.Screen
        name="Login"
        children={
          ({ navigation }) => (
            //withCommander(
            <LoginScreen
              navigation={navigation}
              scope={ENVIRONMENT.getResource("hearing").scopes[0]}
              bundleIdentifier={appJSON.expo.ios.bundleIdentifier}
              mainRoute="Feature"
              logo={logo}
              showDemoButton
              onDemoPress={() => {
                dispatch(actions.setConfig({ key: "demoMode", value: true }));
                navigation.navigate("DefaultRoute");
              }}
            />
          )
          //)
        }
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Feature" component={withCommander(FeaturePage)} />
      <Stack.Screen
        name="DefaultRoute"
        component={withCommander(DefaultPage)}
        options={({ navigation }: any) => ({
          headerRight: () => (
            <TouchableOpacity
              testID="ButtonSettings"
              onPress={() => navigation.navigate("SettingsRoute")}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            >
              <Ionicons name="md-cog" color={EQUINOR_GREEN} size={24} />
            </TouchableOpacity>
          ),
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="PreTestRoute"
        component={withCommander(PreTestPage)}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SoundCheckRoute"
        component={withUtilities(SoundCheckPage)}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SoundCheckFinishedRoute"
        component={withUtilities(SoundCheckFinishedPage)}
      />
      <Stack.Screen
        name="TestRoute"
        component={withUtilities(TestPage)}
        options={({ navigation }: any) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("SettingsRoute")}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            >
              <MaterialIcons name="md-more" color="white" size={24} />
            </TouchableOpacity>
          ),
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="TestResultRoute"
        component={withUtilities(TestResultPage)}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
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

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
