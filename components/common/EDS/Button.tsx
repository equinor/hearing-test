import { Spinner } from "mad-expo-core";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import Typography from "../atoms/Typography";

const ButtonEDS = (props: {
  onPress: () => void;
  text: string;
  outlined?: boolean;
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}) => {
  function getBackgroundColor() {
    if (props.disabled || props.loading || props.outlined) return `#EAEAEA`;
    if (props.danger) return "#EB0000";
    return "#007079";
  }

  const { danger, disabled, loading, onPress, outlined, text } = props;
  return (
    <TouchableOpacity onPress={onPress} disabled={loading || disabled}>
      <View
        style={{
          height: 40,
          width: 160,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          marginBottom: 18,
          borderWidth: !danger && 1,
          backgroundColor: getBackgroundColor(),
          borderColor: disabled || loading ? `#DCDCDC` : "#007079",
          ...props.style,
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Typography
            variant="button"
            color={outlined ? "#007079" : "white"}
            style={{
              textAlign: "center",
            }}
          >
            {text}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

ButtonEDS.defaultProps = {
  outlined: false,
  danger: false,
  loading: false,
  disabled: false,
};

export default ButtonEDS;
