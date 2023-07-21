import { MaterialIcons as Icon } from "@expo/vector-icons";
import { View } from "react-native";

import Card from "./Card";
import Typography from "./Typography";
import { EQUINOR_GREEN } from "../../../constants/colors";

const NavigationItem = (props: {
  title: string;
  onPress?: CallableFunction;
}) => {
  return (
    <Card onPress={props.onPress} style={{ height: 80 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" style={{ paddingTop: 10 }}>
          {props.title}
        </Typography>
        <View style={{ paddingTop: 10, paddingRight: 16 }}>
          <Icon size={24} color={EQUINOR_GREEN} name="chevron-right" />
        </View>
      </View>
    </Card>
  );
};

export default NavigationItem;
