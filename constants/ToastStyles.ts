import { StyleSheet } from "react-native";

import * as Colors from "./colors";

interface Styles {
  [key: string]: object | StyleSheet.NamedStyles<object>;
}

const styles: Styles = {
  success: StyleSheet.create({}),
  info: StyleSheet.create({}),
  warning: StyleSheet.create({}),
  error: StyleSheet.create({}),
  refresh: StyleSheet.create({
    container: {
      backgroundColor: Colors.BLUE,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "white",
      padding: 5,
    },
    text: {
      color: "white",
      fontSize: 12,
    },
  }),
};

export default styles;
