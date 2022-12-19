import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { EQUINOR_GREEN } from "../../../constants/colors";

type Props = {
  iterable: any[];
  style: StyleProp<ViewStyle>;
};

export const Indicators: React.FC<Props> = ({ iterable = [], style = {} }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      {iterable.map(({ current }, index) => {
        if (current) {
          return (
            <View
              key={index}
              style={{
                borderRadius: 16,
                width: 20,
                height: 10,
                backgroundColor: EQUINOR_GREEN,
                margin: 2,
              }}
            />
          );
        }
        return (
          <View
            key={index}
            style={{
              borderRadius: 16,
              width: 12,
              height: 8,
              backgroundColor: "#97CACE",
              margin: 2,
            }}
          />
        );
      })}
    </View>
  );
};
