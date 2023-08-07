import { Text, TouchableOpacity } from "react-native";

const BigRoundButton = (props: {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) => {
  const diameter = 241;
  const { disabled, text, onPress } = props;

  let borderWidth = 0;
  const borderColor = "#007079";
  let textColor = "white";
  let backgroundColor = "#007079";
  if (props.variant === "secondary") {
    borderWidth = 1;
    textColor = "#007079";
    backgroundColor = "transparent";
  }
  return (
    <TouchableOpacity
      testID="BigRoundButton"
      onPress={onPress}
      disabled={disabled}
      style={{
        height: diameter,
        width: diameter,
        alignItems: "center",
        justifyContent: "center",
        borderColor,
        borderWidth,

        borderRadius: diameter / 2,
        backgroundColor:
          disabled || props.variant === "secondary"
            ? "#EFEFEF"
            : backgroundColor,
      }}
    >
      <Text style={{ color: disabled ? "#666666" : textColor, fontSize: 17 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

BigRoundButton.defaultProps = {
  disabled: false,
  variant: "primary",
};

export default BigRoundButton;
