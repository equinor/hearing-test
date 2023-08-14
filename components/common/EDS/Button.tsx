import { Button } from "@equinor/mad-components";
import { StyleProp, ViewStyle } from "react-native";

export type ButtonProps = {
  onPress: () => void;
  text: string;
  outlined?: boolean;
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const ButtonEDS = ({
  onPress,
  text,
  outlined = false,
  danger = false,
  loading = false,
  disabled = false,
  style = {},
}: ButtonProps) => {
  const buttonColor = danger ? "danger" : "primary";
  const buttonVariant = outlined ? "outlined" : "contained";

  return (
    <Button
      title={text}
      color={buttonColor}
      variant={buttonVariant}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={style}
    />
  );
};

export default ButtonEDS;
