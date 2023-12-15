import { EDSStyleSheet, useStyles } from "@equinor/mad-components";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, View, ViewStyle } from "react-native";

type ProgressAnimationBarProps = {
  duration: number;
  timeout: number;
  disabled: boolean;
  style?: StyleProp<ViewStyle>;
};

const STROKE_WIDTH = 6;

export const ProgressAnimationBar = ({
  duration,
  timeout,
  disabled,
  style,
}: ProgressAnimationBarProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const styles = useStyles(themeStyles, { disabled, animatedValue });

  useEffect(() => {
    if (!disabled)
      setTimeout(
        () =>
          Animated.timing(animatedValue, {
            toValue: 100,
            duration,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start(),
        timeout
      );
  }, [animatedValue]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.backgroundContainer} />
      <Animated.View style={styles.progressBar} />
    </View>
  );
};

type ThemeStyleProps = Pick<ProgressAnimationBarProps, "disabled"> & {
  animatedValue: Animated.Value;
};

const themeStyles = EDSStyleSheet.create(
  (theme, { disabled, animatedValue }: ThemeStyleProps) => ({
    container: {
      height: STROKE_WIDTH,
      borderRadius: STROKE_WIDTH / 2,
      overflow: "hidden",
      opacity: disabled ? 0 : 1,
    },
    backgroundContainer: {
      height: "100%",
      backgroundColor: theme.colors.interactive.primary,
      opacity: 0.16,
    },
    progressBar: {
      height: "100%",
      width: animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      }),
      backgroundColor: theme.colors.interactive.primary,
      top: -STROKE_WIDTH,
    },
  })
);
