import { Linking, Text, TouchableHighlight } from "react-native";
import { connect } from "react-redux";

import { STOP } from "../../../constants/colors";
import { Error, selectError } from "../../../store/test/reducer";

const ErrorBannerComponent = ({ error }: { error: Error }) => {
  if (error.status)
    return (
      <TouchableHighlight
        style={{ backgroundColor: STOP, padding: 12, margin: 0 }}
        onPress={() =>
          Linking.openURL(
            `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`
          )
        }
      >
        <>
          <Text style={{ color: "white" }}>Could not submit test due to</Text>
          <Text style={{ fontSize: 23, color: "white", marginVertical: 4 }}>
            ERROR: {error.status} {error.message && `| ${error.message}`}
          </Text>
          <Text style={{ color: "white" }}>Click to learn more...</Text>
        </>
      </TouchableHighlight>
    );

  return <></>;
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  error: selectError(state),
});

export const ErrorBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBannerComponent);
