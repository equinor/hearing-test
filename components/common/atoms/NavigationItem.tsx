import { Typography } from "@equinor/mad-components";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import Card from "./Card";
import { EQUINOR_GREEN } from "../../../constants/colors";

const NavigationItem = (props: {
  title: string;
  onPress?: CallableFunction;
}) => {
  return (
    <Card onPress={props.onPress} style={styles.container}>
      <Typography color="primary">{props.title}</Typography>
      <Icon
        size={24}
        color={EQUINOR_GREEN}
        name="chevron-right"
        style={styles.icon}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: { marginRight: 16 },
});

export default NavigationItem;
