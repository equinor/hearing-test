import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS } from "../../../constants/colors";

type IndicatorsProps = {
  iterable: any[];
  style?: StyleProp<ViewStyle>;
};

export const Indicators = ({ iterable = [], style }: IndicatorsProps) => (
  <View style={[styles.container, style]}>
    {iterable.map(({ current, hideIndicator }, index) => {
      if (hideIndicator) {
        return null;
      }

      return (
        <View
          key={index}
          style={[
            styles.indicator,
            {
              width: current ? 20 : 12,
              height: current ? 10 : 8,
              backgroundColor: current ? COLORS.MOSS_GREEN_100 : "#97CACE",
            },
          ]}
        />
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    borderRadius: 16,
    margin: 2,
  },
});
