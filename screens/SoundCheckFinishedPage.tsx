import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";

import thumbsUp from "../assets/images/thumbs-up.png";
import ButtonEDS from "../components/common/EDS/Button";
import Typography from "../components/common/atoms/Typography";
import { GRAY_BACKGROUND } from "../constants/colors";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
    padding: 54,
    paddingTop: 80,
  },
});

// TODO: prop type
const SoundCheckFinishedPage = (props: any) => {
  return (
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
          />
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = () => ({
  // TODO
});

const mapStateToProps = () => ({
  // TODO
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundCheckFinishedPage);
