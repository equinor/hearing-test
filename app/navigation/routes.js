import DefaultPage from '../containers/DefaultPage';
import SettingsPage from '../containers/SettingsPage';
import AboutPage from '../containers/AboutPage';
import withUtilities from './utils';
import PreTestPage from '../containers/PreTestPage';
import SoundCheckPage from '../containers/SoundCheckPage';

export default {
  DefaultRoute: { screen: withUtilities(DefaultPage) },
  SettingsRoute: { screen: withUtilities(SettingsPage) },
  AboutRoute: { screen: withUtilities(AboutPage) },
  PreTestRoute: { screen: withUtilities(PreTestPage) },
  SoundCheckRoute: { screen: withUtilities(SoundCheckPage) },
};
