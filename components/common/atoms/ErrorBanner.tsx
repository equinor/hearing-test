import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";

import { selectError } from "../../../store/test/reducer";
import { openURL } from "../../../utils/linking";

export const ErrorBanner = () => {
  const { message, status } = useSelector((state) => selectError(state));
  const styles = useStyles(themeStyles);

  if (status)
    return (
      <TouchableHighlight
        onPress={() =>
          openURL(
            `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${status}`
          )
        }
        style={styles.container}
      >
        <>
          <Typography color="textInverted">
            Could not submit test due to
          </Typography>
          <Typography
            color="textInverted"
            variant="h3"
            style={styles.statusAndMessage}
          >
            {`ERROR: ${status} ${message ? `| ${message}` : ""}`}
          </Typography>
          <Typography color="textInverted">Click to learn more...</Typography>
        </>
      </TouchableHighlight>
    );

  return <></>;
};

const themeStyles = EDSStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.interactive.danger,
    padding: 12,
  },
  statusAndMessage: {
    marginVertical: 4,
  },
}));
