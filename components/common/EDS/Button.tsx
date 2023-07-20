import { Spinner } from "mad-expo-core";
import { TouchableOpacity, View } from "react-native";

import { ButtonProps } from "../../../types";
import Typography from "../atoms/Typography";

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
