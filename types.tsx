/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Modal: undefined;
  NotFound: undefined;
  LoginRoute: undefined;
  FeatureRoute: undefined;
  SettingsRoute: undefined;
  AboutRoute: undefined;
  FeedbackRoute: undefined;
  DefaultRoute: undefined;
  PreTestRoute: undefined;
  SoundCheckRoute: undefined;
  SoundCheckFinishedRoute: undefined;
  TestRoute: undefined;
  TestResultRoute: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};
