import { Typography } from "mad-expo-core";
import PropTypes from "prop-types";
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";

import { SimpleInfoItem, SimpleItem } from "./common/atoms/SimpleInfoItem";

type Section = {
  key: string;
  data: SimpleItem[];
};

export type AppInfoProps = {
  sections: Section[];
};

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

export const AppInfo = ({ sections }: AppInfoProps) => {
  const SeparatorComponent = () => <View style={styles.separator} />;

  const renderSectionHeader = (info: {
    section: SectionListData<SimpleItem, Section>;
  }) => (
    <View style={{ padding: 16 }}>
      <Typography variant="h4">{info.section.key}</Typography>
    </View>
  );

  const renderItem = (item: SectionListRenderItemInfo<SimpleItem, Section>) => (
    <View style={styles.item}>
      <SimpleInfoItem item={item.item} />
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
      style={styles.container}
    />
  );
};

AppInfo.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppInfo;
