import { alert } from "@equinor/mad-components";

export const confirmationDialog = (
  title: string,
  onConfirm: () => void,
  message = ""
) =>
  alert(title, message, [
    {
      text: "Nei",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Ja",
      onPress: onConfirm,
      style: "destructive",
    },
  ]);
