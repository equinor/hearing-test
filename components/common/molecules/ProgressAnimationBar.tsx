import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

import { COLORS } from "../../../constants/colors";

const ProgressAnimationBar = (props: {
  duration: number;
  timeout: number;
  disabled: boolean;
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!props.disabled)
      setTimeout(
        () =>
          Animated.timing(progressAnim, {
            toValue: 100,
            duration: props.duration,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start(),
        props.timeout
      );
  }, [progressAnim]);

  if (props.disabled) return <View style={{ height: 4 }} />;

  return (
    <View
      style={{
        height: 4,
        width: "100%",
        backgroundColor: "#DCDCDC",
      }}
    >
      <Animated.View
        style={{
          height: "100%",
          backgroundColor: COLORS.MOSS_GREEN_100,
          width: progressAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
        }}
      />
    </View>
  );
};

export default ProgressAnimationBar;
