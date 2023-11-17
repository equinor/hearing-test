import { Button } from "@equinor/mad-components";
import { ReactNode } from "react";
import { Modal, View } from "react-native";

import Typography from "../atoms/Typography";

export const SlideModal = (props: {
  title: string;
  visible: boolean;
  setInvisible: () => void;
  children?: ReactNode;
}) => (
  <Modal
    animationType="slide"
    presentationStyle="overFullScreen"
    transparent
    visible={props.visible}
    onDismiss={() => props.setInvisible()}
    onRequestClose={() => props.setInvisible()}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "#DCDCDC",
        marginTop: 110,
        backgroundColor: "white",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View style={{ height: 40, width: 40 }} />
      <Typography variant="h1">{props.title}</Typography>
      <Button.Icon name="close" onPress={props.setInvisible} variant="ghost" />
    </View>
    <View style={{ flex: 1, padding: 24, backgroundColor: "white" }}>
      {props.children}
    </View>
  </Modal>
);
