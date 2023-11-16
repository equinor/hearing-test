import { Button } from "@equinor/mad-components";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import thumbsUp from "../assets/images/thumbs-up.png";
import Typography from "../components/common/atoms/Typography";
import { RootStackScreenProps } from "../types";

type SoundCheckFinishedScreenProps =
  RootStackScreenProps<"SoundCheckFinishedRoute">;

const SoundCheckFinishedScreen = ({
  navigation,
}: SoundCheckFinishedScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={thumbsUp} style={styles.image} />
        <Typography variant="p" numberOfLines={4} style={styles.text}>
          Bra! Du er klar for å ta hørselstesten.
        </Typography>
        <View style={styles.buttonGroup}>
          <Button
            title="Ta ny lydsjekk"
            onPress={() => navigation.navigate("SoundCheckRoute")}
            variant="outlined"
            style={[
              styles.button,
              {
                marginBottom: 16,
              },
            ]}
          />
          <Button
            title="Start testen"
            onPress={() => navigation.navigate("TestRoute")}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  image: {
    height: 250,
    resizeMode: "contain",
    marginBottom: 32,
  },
  text: {
    textAlign: "center",
    height: 18 * 4,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: { width: 160 },
});

export default SoundCheckFinishedScreen;
