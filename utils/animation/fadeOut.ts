import { Animated } from "react-native";

import { ANIMATION_DURATION } from "../../constants/animation";

export const fadeOut = (value: Animated.Value, onEnd: () => void) => {
  Animated.timing(value, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
  }).start();
  setTimeout(onEnd, ANIMATION_DURATION);
};
