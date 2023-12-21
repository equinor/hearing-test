import {
  CircularProgress,
  EDSStyleSheet,
  useStyles,
} from "@equinor/mad-components";
import { View } from "react-native";

type LoadingProps = {
  verticalAlignment?: "top" | "center";
};

export const Loading = ({ verticalAlignment = "center" }: LoadingProps) => {
  const styles = useStyles(themeStyles, { verticalAlignment });

  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <CircularProgress style={styles.circularProgress} />
      <View style={styles.bottom} />
    </View>
  );
};

type ThemeStylesProps = Pick<LoadingProps, "verticalAlignment">;

const themeStyles = EDSStyleSheet.create(
  (_theme, { verticalAlignment }: ThemeStylesProps) => {
    const flexTop = 1;
    let flexBottom = 1;

    if (verticalAlignment === "top") {
      flexBottom = 4;
    }

    return {
      container: { flex: 1 },
      top: { flex: flexTop },
      circularProgress: { alignSelf: "center" },
      bottom: { flex: flexBottom },
    };
  }
);
