import { Button, Typography } from "@equinor/mad-components";
import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import thumbsUp from "../assets/images/thumbs-up.png";
import { ButtonGroup } from "../components/common/atoms/ButtonGroup";
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
        <Typography>Bra! Du er klar for å ta hørselstesten.</Typography>
        <ButtonGroup>
          <Button
            title="Ta ny lydsjekk"
            onPress={() => navigation.navigate("SoundCheckRoute")}
            variant="outlined"
            style={styles.button}
          />
          <Button
            title="Start testen"
            onPress={() => navigation.navigate("TestRoute")}
            style={styles.button}
          />
        </ButtonGroup>
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
  button: { width: 160 },
});

export default SoundCheckFinishedScreen;
