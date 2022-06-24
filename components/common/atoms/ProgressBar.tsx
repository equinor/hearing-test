import { View } from "react-native";

import { EQUINOR_GREEN } from "../../../constants/colors";

export default function (props: { percentDone: number; disabled?: boolean }) {
  return (
    <>
      <View
        style={{
          backgroundColor: props.disabled ? "transparent" : "#DCDCDC",
          height: 4,
          width: "100%",
        }}
      />
      <View
        style={{
          backgroundColor: props.disabled ? "transparent" : EQUINOR_GREEN,
          height: 4,
          left: 0,
          position: "relative",
          top: -4,
          width: `${props.percentDone}%`,
        }}
      />
    </>
  );
}
