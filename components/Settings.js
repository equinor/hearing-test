import { Button, Typography } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { SectionList, StyleSheet, View } from "react-native";

import * as Colors from "../constants/colors";
import LogoutButton from "./auth/LogoutButton";
import { TextLink } from "./common";

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  sectionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_3,
  },
  itemContainer: {
    justifyContent: "center",
    backgroundColor: "white",
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
    color: Colors.EQUINOR_GREEN,
    alignSelf: "flex-start",
  },
  textStyle: {
    color: Colors.GRAY_1,
    fontSize: 16,
    alignSelf: "flex-start",
  },
  viewStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "flex-start",
  },
});

export default class Settings extends Component {
  static propTypes = {
    currentUser: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  RenderItem = (props) => {
    if (props.item.key === "User") {
      return this.TextItem(props);
    }
    return this.LinkItem(props);
  };

  LinkItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TextLink
        textStyle={styles.itemText}
        data={item}
        nav={this.props.navigation}
      />
    </View>
  );

  TextItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Typography style={styles.textStyle}>{item.name}</Typography>
    </View>
  );

  feedBack = () => {
    this.props.navigation.navigate("FeedbackRoute");
  };

  ButtonItem = ({ item }) => {
    if (item.key === "Logout") {
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
        key: "Links",
        renderItem: this.RenderItem,
        data: [
          {
            key: "About",
            name: "About",
            route: "AboutRoute",
          },
          {
            key: "Feedback",
            name: "Feedback",
            route: "FeedbackRoute",
          },
          {
            name: `Logged in as: ${this.props.currentUser}`,
            key: "User",
          },
        ],
      },
      {
        key: "Buttons",
        renderItem: this.ButtonItem,
        data: [{ text: "Log out", key: "Logout" }],
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
