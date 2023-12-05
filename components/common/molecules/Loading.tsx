import { CircularProgress } from "@equinor/mad-components";
import { StyleSheet, View } from "react-native";

export const Loading = () => (
  <View style={styles.container}>
    <View style={styles.top} />
    <CircularProgress style={styles.circularProgress} />
    <View style={styles.bottom} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { flex: 1 },
  circularProgress: { alignSelf: "center" },
  bottom: { flex: 4 },
});
