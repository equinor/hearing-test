/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  CommonActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Localization from "expo-localization";
import {
  SettingsScreen as ExpoSettings,
  FeedbackScreen,
  LoginScreen,
} from "mad-expo-core";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { withCommander } from "react-native-salute";
import { useDispatch } from "react-redux";

import * as appJSON from "../app.json";
import AboutPage from "../app/containers/AboutPage";
import DefaultPage from "../app/containers/DefaultPage";
import FeaturePage from "../app/containers/FeaturePage";
import withUtilities from "../app/navigation/utils";
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
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        children={
          ({ navigation }) => (
            //withCommander(
            <LoginScreen
              navigation={navigation}
              scope={ENVIRONMENT.getResource("mad").scopes[0]}
              bundleIdentifier={appJSON.expo.ios.bundleIdentifier}
              mainRoute="DefaultRoute"
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
      <Stack.Screen
        name="DefaultRoute"
        component={withCommander(DefaultPage)}
      />
      <Stack.Screen name="Feature" component={withCommander(FeaturePage)} />
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
          options={{
            headerTintColor: "green",
          }}
          children={({ navigation }) => (
            <ExpoSettings
              config={[
                {
                  icon: "arrow-forward-ios",
                  title: "About",
                  route: "AboutRoute",
                },
                {
                  icon: "arrow-forward-ios",
                  title: "Feedback",
                  route: "FeedbackRoute",
                },
              ]}
              navigation={navigation}
              onLogout={() => {
                dispatch(actions.setConfig({ key: "demoMode", value: false }));
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  })
                );
              }}
            />
          )}
        />
        <Stack.Screen
          name="FeedbackRoute"
          children={() => (
            <FeedbackScreen
              locale={Localization.locale}
              timezone={Localization.timezone}
              scope={ENVIRONMENT.getResource("mad").scopes[0]}
              apiBaseUrl={`${ENVIRONMENT.getResource("mad").ApiBaseUrl}`}
              product={`${appJSON.expo.name} | ${appJSON.expo.version}(${appJSON.expo.ios.buildNumber})`}
            />
          )}
          options={{
            headerTintColor: "green",
            title: "Feedback",
          }}
        />
        <Stack.Screen
          name="AboutRoute"
          component={withUtilities(AboutPage)}
          options={{
            headerTintColor: "green",
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
