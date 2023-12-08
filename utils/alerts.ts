import { alert } from "@equinor/mad-components";

export const confirmationDialog = (
  title: string,
  onConfirm: () => void,
  message = "",
  onCancel = () => {}
) =>
  alert(title, message, [
    {
      text: "Nei",
      onPress: onCancel,
      style: "cancel",
    },
    {
      text: "Ja",
      onPress: onConfirm,
      style: "destructive",
    },
  ]);
