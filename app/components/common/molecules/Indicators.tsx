import React from "react";
import { View } from "react-native";

import { EQUINOR_GREEN } from "../../../../constants/colors";

export default function Indicators(props: { iterable: [] }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.iterable.map(({ current, done }, index) => {
        const diameter = 16;
        const style = { width: diameter, height: diameter };
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
}
