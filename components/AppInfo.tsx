import { Typography } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { ReactElement } from "react";
import {
  SectionList,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

import { SimpleInfoItem } from "./common";

interface Section {
  key: string;
}

interface Item {
  key: string;
  label: string;
  text: string;
}

interface AppInfoProps {
  sections: Section[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    backgroundColor: "white",
    marginBottom: 2,
    padding: 16,
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});

const AppInfo: React.FC<AppInfoProps> = ({ sections }): ReactElement => {
  const SeparatorComponent = (): ReactElement => (
    <View style={styles.separator} />
  );

  const renderSectionHeader = ({
    section,
  }: {
    section: Section;
  }): ReactElement => (
    <View style={{ padding: 16 }}>
      <Typography variant="h4">{section.key}</Typography>
    </View>
  );

  const renderItem = ({ item }: { item: Item }): ReactElement => (
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
      removeClippedSubviews={false}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
      SectionSeparatorComponent={SeparatorComponent}
      style={styles.container as StyleProp<ViewStyle>}
    />
  );
};

AppInfo.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppInfo;
