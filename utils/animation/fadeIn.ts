import { Animated } from "react-native";

import { ANIMATION_DURATION } from "../../constants/animation";

export const fadeIn = (value: Animated.Value) => {
  Animated.timing(value, {
    toValue: 1,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
  }).start();
};
