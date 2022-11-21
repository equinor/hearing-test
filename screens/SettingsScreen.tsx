import { getAccount } from "mad-expo-core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import Settings from "../components/Settings";
import withUtilities from "../navigation/utils";
import { getConfig } from "../store/app-config";
import { RootStackScreenProps } from "../types";

interface Props extends RootStackScreenProps<"SettingsRoute"> {
  appConfig: { demoMode: boolean };
}

const SettingsScreen = ({ appConfig: { demoMode }, navigation }: Props) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    if (demoMode) {
      setCurrentUser("John");
    } else {
      getAccount().then(({ username }) => {
        setCurrentUser(username);
      });
    }
  }, []);

  return currentUser ? (
    <Settings navigation={navigation} currentUser={currentUser} />
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => ({
  appConfig: getConfig(state),
});

export default withUtilities(connect(mapStateToProps)(SettingsScreen));
