import React from "react";

//import AppNavigator from './AppNavigator';
import { displayName } from "../../app.json";
import { Button } from "../components/common";
import * as colors from "../stylesheets/colors";
import { goBack } from "./service";

//export default AppNavigator;

export const defaultNavOptions = {
  title: displayName,
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: colors.EQUINOR_BLACK,
  headerLeft: (
    <Button
      title="Back"
      onPress={() => goBack()}
      textStyle={{ color: colors.RED_LOGO }}
    />
  ),
};
