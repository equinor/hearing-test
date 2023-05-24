import { useNetInfo } from "@react-native-community/netinfo";
import { Button, Typography } from "mad-expo-core";
import { SectionList, StyleSheet, View } from "react-native";

import LogoutButton from "./auth/LogoutButton";
import { TextLink } from "./common";
import * as Colors from "../constants/colors";
import { RootStackScreenProps } from "../types";

type Props = RootStackScreenProps<"SettingsRoute"> & {
  currentUser: string;
};

export const Settings = ({ currentUser, navigation }: Props) => {
  const { isConnected } = useNetInfo();

  const RenderItem = (props) => {
    if (props.item.key === "User") {
      return TextItem(props);
    }

    if (!isConnected && props.item.key === "Feedback") {
      return null;
    }

    return LinkItem(props);
  };

  const LinkItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TextLink textStyle={styles.itemText} data={item} nav={navigation} />
    </View>
  );

  const TextItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Typography style={styles.textStyle}>{item.name}</Typography>
    </View>
  );

  const feedBack = () => {
    navigation.navigate("FeedbackRoute");
  };

  const ButtonItem = ({ item }) => {
    if (item.key === "Logout") {
      return <LogoutButton data={item} nav={navigation} />;
    }
    return (
      <View style={styles.itemContainer}>
        <Button
          title={item.name}
          onPress={feedBack}
          textStyle={styles.itemText}
          viewStyle={styles.viewStyle}
        />
      </View>
    );
  };

  const renderSectionHeader = () => (
    <View style={styles.sectionHeaderContainer} />
  );

  const sections = [
    {
      key: "Links",
      renderItem: RenderItem,
      data: [
        {
          key: "About",
          name: "Om",
          route: "AboutRoute",
        },
        {
          key: "Feedback",
          name: "Tilbakemelding",
          route: "FeedbackRoute",
        },
        {
          name: `Innlogget som ${currentUser}`,
          key: "User",
        },
      ],
    },
    {
      key: "Buttons",
      renderItem: ButtonItem,
      data: [{ text: "Logg ut", key: "Logout" }],
    },
  ];

  return (
    <View style={styles.page}>
      <SectionList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparator} />
        )}
        removeClippedSubviews={false}
        underlayColor={Colors.RED}
      />
    </View>
  );
};

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
