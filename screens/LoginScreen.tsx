import { LoginScreen as LoginScreenMadExpoCore } from "mad-expo-core";
import { connect } from "react-redux";

import logo from "../assets/images/logo.png";
import { getScopes } from "../constants/settings";
import withUtilities from "../navigation/utils";
import { setConfig } from "../store";
import { RootStackScreenProps } from "../types";

type AppConfig = {
  key: string;
  value: boolean;
};

interface Props extends RootStackScreenProps<"LoginRoute"> {
  onDemoPress: (appConfig: AppConfig) => void;
}

const LoginScreen = ({ navigation, onDemoPress }: Props) => (
  <LoginScreenMadExpoCore
    logo={logo}
    mainRoute="FeatureRoute"
    navigation={navigation}
    scopes={getScopes("hearing")}
    showDemoButton
    onDemoPress={() => {
      onDemoPress({ key: "demoMode", value: true });
      navigation.navigate("FeatureRoute");
    }}
  />
);

const mapDispatchToProps = (dispatch) => ({
  onDemoPress: (appConfig: AppConfig) => dispatch(setConfig(appConfig)),
});

export default withUtilities(connect(null, mapDispatchToProps)(LoginScreen));
