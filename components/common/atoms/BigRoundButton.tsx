import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { TouchableOpacity } from "react-native";

type BigRoundButtonProps = {
  title: string;
  onPress: () => void;
  diameter?: number;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export const BigRoundButton = ({
  title,
  onPress,
  diameter = 241,
  disabled = false,
  variant = "primary",
}: BigRoundButtonProps) => {
  const styles = useStyles(themeStyles, { diameter, disabled, variant });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      <Typography style={styles.title}>{title}</Typography>
    </TouchableOpacity>
  );
};

type ThemeStylesProps = Required<
  Pick<BigRoundButtonProps, "diameter" | "disabled" | "variant">
>;

const themeStyles = EDSStyleSheet.create(
  (theme, { diameter, disabled, variant }: ThemeStylesProps) => {
    let borderWidth = 0;
    let backgroundColor = theme.colors.interactive.primary;
    let textColor = theme.colors.text.primaryInverted;

    if (variant === "secondary") {
      borderWidth = 1;
      backgroundColor = "#00000000";
      textColor = theme.colors.interactive.primary;
    }

    return {
      container: {
        width: diameter,
        height: diameter,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.colors.interactive.primary,
        borderWidth,
        borderRadius: diameter / 2,
        backgroundColor: disabled
          ? theme.colors.interactive.disabled
          : backgroundColor,
      },
      title: {
        color: disabled ? theme.colors.text.disabled : textColor,
      },
    };
  }
);
