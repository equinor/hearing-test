import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, StyleSheet, View, Text } from 'react-native';
// import HockeyApp from 'react-native-hockeyapp';
import { track, metricKeys } from '../utils/metrics';
import { Button, TextLink } from './common';
import LogoutButton from './auth/LogoutButton';
import * as Colors from '../stylesheets/colors';
import { BuildConfiguration } from '../settings';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  sectionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_3,
  },
  itemContainer: {
    backgroundColor: 'white',
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionHeaderContainer: {
    height: 30,
  },
  itemText: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.BLUE,
    alignSelf: 'flex-start',
  },
  textStyle: {
    color: Colors.GRAY_1,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  viewStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'flex-start',
  },
});

const aboutListTitle = 'About app';
const feedbackListTitle = 'Feedback';
const loggedInAsText = 'Logged in as';
const logOutText = 'Log out';

export default class Settings extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      displayableId: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  RenderItem = props => {
    if (props.item.key === 'User') {
      return this.TextItem(props);
    } else if (props.item.key === 'Feedback') {
      return this.ButtonItem(props);
    }
    return this.LinkItem(props);
  };

  LinkItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TextLink textStyle={styles.itemText} data={item} nav={this.props.navigation} />
    </View>
  );

  TextItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.textStyle}>{item.name}</Text>
    </View>
  );

  feedBack = () => {
    if (BuildConfiguration !== 'Dev') {
      // HockeyApp.feedback();
      track(metricKeys.FEEDBACK_CLICK);
    }
  };

  ButtonItem = ({ item }) => {
    if (item.key === 'Logout') {
      return <LogoutButton data={item} nav={this.props.navigation} />;
    }
    return (
      <View style={styles.itemContainer}>
        <Button
          title={item.name}
          onPress={this.feedBack}
          textStyle={styles.itemText}
          viewStyle={styles.viewStyle}
        />
      </View>
    );
  };

  renderSectionHeader = () => <View style={styles.sectionHeaderContainer} />;

  render() {
    const { page, list, sectionSeparator } = styles;

    const sections = [
      {
        key: 'Links',
        renderItem: this.RenderItem,
        data: [
          {
            name: aboutListTitle,
            key: 'About',
            route: 'AboutRoute',
          },
          {
            key: 'Feedback',
            name: feedbackListTitle,
          },
          {
            name: `${loggedInAsText}: ${this.props.currentUser.displayableId}`,
            key: 'User',
          },
        ],
      },
      {
        key: 'Buttons',
        renderItem: this.ButtonItem,
        data: [{ text: logOutText, key: 'Logout' }],
      },
    ];

    return (
      <View style={page}>
        <SectionList
          style={list}
          sections={sections}
          renderSectionHeader={this.renderSectionHeader}
          SectionSeparatorComponent={() => <View style={sectionSeparator} />}
          removeClippedSubviews={false}
          underlayColor={Colors.RED}
        />
      </View>
    );
  }
}
