import { getAccount } from "mad-expo-core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Settings } from "../components/Settings";
import withUtilities from "../navigation/utils";
import { getConfig } from "../store/app-config";
import { RootStackScreenProps } from "../types";

type Props = RootStackScreenProps<"SettingsRoute">;

const SettingsScreen = ({ navigation }: Props) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { demoMode } = useSelector((state) => getConfig(state));

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

export default withUtilities(SettingsScreen);
