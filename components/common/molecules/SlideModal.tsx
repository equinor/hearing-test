import { Button, IconButtonProps } from "@equinor/mad-components";
import { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";

import Typography from "../atoms/Typography";

export type SlideModalProps = {
  children: ReactNode;
  setInvisible: () => void;
  title: string;
  visible: boolean;
  leftIconButtonProps?: IconButtonProps;
};

export const SlideModal = ({
  children,
  setInvisible,
  title,
  visible,
  leftIconButtonProps,
}: SlideModalProps) => (
  <Modal
    animationType="slide"
    presentationStyle="overFullScreen"
    transparent
    visible={visible}
  >
    <View style={styles.topSection}>
      <Button.Icon
        name="ghost"
        variant="ghost"
        {...leftIconButtonProps}
        style={{ opacity: leftIconButtonProps ? 1 : 0 }}
      />
      <Typography variant="h1">{title}</Typography>
      <Button.Icon name="close" onPress={setInvisible} variant="ghost" />
    </View>
    <View style={styles.content}>{children}</View>
  </Modal>
);

const styles = StyleSheet.create({
  topSection: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#DCDCDC",
    borderStyle: "solid",
    borderTopEndRadius: 12,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 110,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
});
