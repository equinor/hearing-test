import { Typography } from "mad-expo-core";
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";

import {
  SimpleInfoItem,
  SimpleItem,
} from "../components/common/atoms/SimpleInfoItem";
import { aboutScreenConfig } from "../configs/AboutScreenConfig";

export type Section = {
  title: string;
  data: SimpleItem[];
};

export const AboutScreen = () => {
  const SeparatorComponent = () => <View style={styles.separator} />;

  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<SimpleItem, Section>;
  }) => (
    <View style={{ padding: 16 }}>
      <Typography variant="h4">{section.key}</Typography>
    </View>
  );

  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<SimpleItem, Section>) => (
    <View style={styles.item}>
      <SimpleInfoItem item={item} />
    </View>
  );

  return (
    <SectionList
      removeClippedSubviews={false}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={aboutScreenConfig}
      SectionSeparatorComponent={SeparatorComponent}
      style={styles.container}
    />
  );
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
