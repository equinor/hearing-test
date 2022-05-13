import React from "react";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";

import Bg from "../../../resources/images/bg.png";
export default function AppContainer(props: { children: JSX.Element }) {
  if (Platform.OS === "web") {
    return (
      <ImageBackground style={styles.container} source={Bg}>
        <View style={{ maxWidth: 800, height: "100%" }}>{props.children}</View>
      </ImageBackground>
    );
  } else {
    return <View style={{ flex: 1 }}>{props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
