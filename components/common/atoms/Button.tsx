import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const Button = ({
  onPress,
  title,
  busy = false,
  disabled = false,
  textStyle = {},
  viewStyle = {},
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string | JSX.Element;
  busy?: boolean;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}) => {
  const titleComponent =
    typeof title === "string" ? (
      <Text style={[styles.defaultTextStyle, textStyle]}>{title}</Text>
    ) : (
      title
    );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.defaultButtonStyle,
          viewStyle,
          disabled && { opacity: 0.5 },
        ]}
      >
        {busy && <ActivityIndicator size="small" style={{ marginRight: 4 }} />}
        {titleComponent}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultButtonStyle: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  defaultTextStyle: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "white",
    fontSize: 16,
  },
});

export default Button;
