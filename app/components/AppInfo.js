import PropTypes from "prop-types";
import React from "react";
import { View, SectionList, StyleSheet, Text } from "react-native";

import * as Colors from "../../constants/colors";
import { SimpleInfoItem } from "./common";

const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 20,
  },
  headerText: {
    lineHeight: 30,
    fontSize: 18,
    color: Colors.GRAY_1,
    fontWeight: "500",
  },
  item: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  separator: {
    marginTop: 10,
    height: SEPARATOR_HEIGHT,
    backgroundColor: "rgb(200, 199, 204)",
  },
});

const AppInfo = ({ sections }) => {
  const SeparatorComponent = () => <View style={styles.separator} />;

  const renderSectionHeader = ({ section }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.key}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <SimpleInfoItem item={item} />
    </View>
  );

  renderSectionHeader.propTypes = {
    section: PropTypes.object.isRequired,
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      SectionSeparatorComponent={SeparatorComponent}
      removeClippedSubviews={false}
    />
  );
};

AppInfo.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppInfo;
