import { Spinner } from "mad-expo-core";
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Typography from "../atoms/Typography";

export type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
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
  const getBackgroundColor = () => {
    if (disabled || loading || outlined) return `#EAEAEA`;
    if (danger) return "#EB0000";
    return "#007079";
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={loading || disabled}>
      <View
        style={[
          {
            height: 40,
            width: 160,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            marginBottom: 18,
            borderWidth: danger ? 0 : 1,
            backgroundColor: getBackgroundColor(),
            borderColor: disabled || loading ? "#DCDCDC" : "#007079",
          },
          style,
        ]}
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

export default ButtonEDS;
