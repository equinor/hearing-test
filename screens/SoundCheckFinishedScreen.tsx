import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import thumbsUp from "../assets/images/thumbs-up.png";
import ButtonEDS from "../components/common/EDS/Button";
import Typography from "../components/common/atoms/Typography";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    padding: 54,
    paddingTop: 80,
  },
});

// TODO: prop type
const SoundCheckFinishedScreen = (props: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.component}>
        <View style={{ display: "flex", height: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={thumbsUp}
              style={{ height: 250, resizeMode: "contain" }}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Typography
              variant="p"
              style={{ textAlign: "center", height: 18 * 4 }}
              numberOfLines={4}
            >
              Bra jobba! Du er klar for å ta hørselstesten.
            </Typography>
          </View>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column-reverse",
              justifyContent: "flex-start",
              paddingBottom: 32,
            }}
          >
            <ButtonEDS
              text="Start testen"
              onPress={() => props.navigation.navigate("TestRoute")}
            />
            <ButtonEDS
              text="Ta ny lydsjekk"
              onPress={() => props.navigation.navigate("SoundCheckRoute")}
              outlined
              style={{
                marginBottom: 16,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SoundCheckFinishedScreen;
