import { View } from "react-native";

import ButtonEDS, { ButtonProps } from "../EDS/Button";

export const Buttons = ({ buttons }: { buttons: ButtonProps[] }) => {
  return (
    <View>
      {buttons.map(
        (
          { onPress, text, danger, disabled, loading, outlined, style },
          index
        ) => {
          const isLast = index === buttons.length - 1;
          return (
            <ButtonEDS
              key={text}
              onPress={onPress}
              text={text}
              danger={danger}
              disabled={disabled}
              loading={loading}
              outlined={outlined}
              style={[style, { marginBottom: isLast ? 0 : 12 }]}
            />
          );
        }
      )}
    </View>
  );
};
