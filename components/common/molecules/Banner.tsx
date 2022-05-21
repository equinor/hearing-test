import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import * as Colors from "../../../constants/colors";

const Banner = (props: {
  text: string;
  textStyle: StyleProp<TextStyle>;
  viewStyle: StyleProp<ViewStyle>;
}) => {
  const { text = "", textStyle = {}, viewStyle = {} } = props;
  return (
    <View style={[styles.bannerContainer, viewStyle]}>
      <Text style={[styles.bannerText, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: Colors.PURPLE_LIGHT,
  },
  bannerText: {
    fontSize: 14,
  },
});

export default Banner;
