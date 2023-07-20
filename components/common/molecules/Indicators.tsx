import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { MOSS_GREEN_100 } from "../../../constants/colors";

type Props = {
  iterable: any[];
  style?: StyleProp<ViewStyle>;
};

export const Indicators: React.FC<Props> = ({ iterable = [], style }) => (
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
              backgroundColor: current ? MOSS_GREEN_100 : "#97CACE",
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
