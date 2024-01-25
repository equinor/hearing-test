import { Button, Typography } from "@equinor/mad-components";
import { StyleSheet, View } from "react-native";

import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFoundRoute">) {
  return (
    <View style={styles.container}>
      <Typography variant="h3">This screen doesn't exist.</Typography>
      <Button
        title="Go to home screen!"
        onPress={() => navigation.replace("Root")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },
});
