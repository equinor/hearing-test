import { Typography } from "mad-expo-core";
import { TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";

import { STOP } from "../../../constants/colors";
import { selectError } from "../../../store/test/reducer";
import { openURL } from "../../../utils/linking";

export const ErrorBanner = () => {
  const { message, status } = useSelector((state) => selectError(state));

  if (status)
    return (
      <TouchableHighlight
        style={{ backgroundColor: STOP, padding: 12 }}
        onPress={() =>
          openURL(
            `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${status}`
          )
        }
      >
        <>
          <Typography color="white">Could not submit test due to</Typography>
          <Typography color="white" variant="h3" style={{ marginVertical: 4 }}>
            ERROR: {status} {message && `| ${message}`}
          </Typography>
          <Typography color="white">Click to learn more...</Typography>
        </>
      </TouchableHighlight>
    );

  return <></>;
};
