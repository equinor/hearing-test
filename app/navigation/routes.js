import DefaultPage from '../containers/DefaultPage';
import SettingsPage from '../containers/SettingsPage';
import AboutPage from '../containers/AboutPage';
import withUtilities from './utils';

export default {
  DefaultRoute: { screen: withUtilities(DefaultPage) },
  SettingsRoute: { screen: withUtilities(SettingsPage) },
  AboutRoute: { screen: withUtilities(AboutPage) },
};
