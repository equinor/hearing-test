import AboutPage from "../../screens/AboutPage";
import DefaultPage from "../../screens/DefaultPage";
import FeedbackPage from "../../screens/FeedbackPage";
import PreTestPage from "../../screens/PreTestPage";
import SettingsPage from "../../screens/SettingsPage";
import SoundCheckFinishedPage from "../../screens/SoundCheckFinishedPage";
import SoundCheckPage from "../../screens/SoundCheckPage";
import TestLogPage from "../../screens/TestLogPage";
import TestPage from "../../screens/TestPage";
import TestResultPage from "../../screens/TestResultPage";
import withUtilities from "./utils";

export default {
  DefaultRoute: { screen: withUtilities(DefaultPage) },
  SettingsRoute: { screen: withUtilities(SettingsPage) },
  AboutRoute: { screen: withUtilities(AboutPage) },
  PreTestRoute: { screen: withUtilities(PreTestPage) },
  TestLogRoute: { screen: withUtilities(TestLogPage) },
  SoundCheckRoute: { screen: withUtilities(SoundCheckPage) },
  SoundCheckFinishedRoute: { screen: withUtilities(SoundCheckFinishedPage) },
  TestRoute: { screen: withUtilities(TestPage) },
  TestResultRoute: { screen: withUtilities(TestResultPage) },
  FeedbackRoute: { screen: withUtilities(FeedbackPage) },
};
