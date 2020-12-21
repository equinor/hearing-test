import DefaultPage from '../containers/DefaultPage';
import SettingsPage from '../containers/SettingsPage';
import AboutPage from '../containers/AboutPage';
import withUtilities from './utils';
import PreTestPage from '../containers/PreTestPage';
import SoundCheckPage from '../containers/SoundCheckPage';
import TestPage from '../containers/TestPage';
import TestResultPage from '../containers/TestResultPage';
import FeedbackPage from '../containers/FeedbackPage';
import TestLogPage from '../containers/TestLogPage';

export default {
  DefaultRoute: { screen: withUtilities(DefaultPage) },
  SettingsRoute: { screen: withUtilities(SettingsPage) },
  AboutRoute: { screen: withUtilities(AboutPage) },
  PreTestRoute: { screen: withUtilities(PreTestPage) },
  TestLogRoute: { screen: withUtilities(TestLogPage) },
  SoundCheckRoute: { screen: withUtilities(SoundCheckPage) },
  TestRoute: { screen: withUtilities(TestPage) },
  TestResultRoute: { screen: withUtilities(TestResultPage) },
  FeedbackRoute: { screen: withUtilities(FeedbackPage) },
};
