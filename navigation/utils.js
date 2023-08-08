import { withCommander } from "react-native-salute";

import environmentBanner from "../utils/environmentBanner";

const withUtilities = (ScreenComponent) => {
  const withEnvironmentBanner = environmentBanner(ScreenComponent);
  const WithCommander = withCommander(withEnvironmentBanner);
  return WithCommander;
};

export default withUtilities;
