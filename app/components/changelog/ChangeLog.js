import { Button } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import * as Colors from "../../stylesheets/colors";
import { Spinner } from "./../common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "center",
    backgroundColor: Colors.GRAY_4,
  },
  footer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.GRAY_2,
    borderTopWidth: 0.5,
  },
  titleHeader: {
    marginVertical: 15,
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 30,
    color: Colors.GRAY_1,
  },
  subtitleHeader: {
    fontSize: 20,
    marginVertical: 5,
    color: Colors.GRAY_1,
  },
  changelogText: {
    fontSize: 16,
    marginVertical: 1,
    color: Colors.GRAY_1,
  },
  bullet: {
    fontSize: 16,
    marginVertical: 1,
    marginRight: 5,
    color: Colors.GRAY_1,
  },
  buttonStyle: {
    backgroundColor: Colors.EQUINOR_GREEN,
    margin: 20,
  },
  bulletList: {
    flexDirection: "row",
  },
  changelogItem: {
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

const featureTitle = "What's new";
const affirmText = "OK";

export default class ChangeLog extends Component {
  static propTypes = {
    releaseNote: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    affirm: PropTypes.func.isRequired,
  };

  renderChangeLog(release) {
    const { changelogItem, subtitleHeader, changelogText, bullet, bulletList } =
      styles;

    const changes = release.changes || [];
    return (
      <ScrollView style={changelogItem}>
        <Text style={subtitleHeader}>{release.header}</Text>
        <Text style={changelogText}>{release.subHeader}</Text>
        <View style={{ margin: 5, marginLeft: 10 }}>
          {changes.map((change, index) => (
            <View key={index.toString()} style={bulletList}>
              <Text style={bullet}>{"\u2022"}</Text>
              <Text style={changelogText}>{change}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  render() {
    const { container, footer, titleHeader, buttonStyle } = styles;

    const { releaseNote, affirm, fetching } = this.props;

    if (fetching) {
      return <Spinner />;
    }

    return (
      <View style={container}>
        <Text style={titleHeader}>{featureTitle}</Text>
        {this.renderChangeLog(releaseNote)}
        <View style={footer}>
          <Button title={affirmText} onPress={affirm} style={buttonStyle} />
        </View>
      </View>
    );
  }
}
