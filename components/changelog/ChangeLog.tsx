import { Button, Spinner, Typography } from "mad-expo-core";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ReleaseNote } from "../../types";

export default function ChangeLog(props: {
  affirm: () => void;
  fetching: boolean;
  releaseNote: ReleaseNote;
}) {
  const { affirm, fetching, releaseNote } = props;

  if (fetching) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Typography
        variant="h1"
        style={{ alignSelf: "center", marginTop: 48, marginBottom: 32 }}
      >
        What's new
      </Typography>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{renderChangeLog(releaseNote)}</View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="OK" onPress={affirm} />
      </View>
    </SafeAreaView>
  );
}

function renderChangeLog(releaseNote: ReleaseNote) {
  const changes = releaseNote.changes || [];

  return (
    <View style={styles.changelogItem}>
      <Typography variant="h4" style={{ marginVertical: 5 }}>
        {releaseNote.header}
      </Typography>
      {releaseNote.subHeader && (
        <Typography style={styles.changelogText}>
          {releaseNote.subHeader}
        </Typography>
      )}
      <View style={{ margin: 5, marginLeft: 10 }}>
        {changes.map((change, index) => (
          <View key={index.toString()} style={{ flexDirection: "row" }}>
            <Typography style={styles.bullet}>{"\u2022"}</Typography>
            <Typography style={styles.changelogText}>{change}</Typography>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  changelogItem: {
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bullet: {
    fontSize: 16,
    marginRight: 5,
    marginVertical: 6,
  },
  changelogText: {
    marginVertical: 6,
  },
  footer: {
    alignItems: "center",
    borderColor: "lightgray",
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    paddingTop: 15,
  },
});
