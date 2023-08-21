import { Alert } from "react-native";

export const confirmationDialog = (
  title: string,
  onConfirm: () => void,
  message?: string
) =>
  Alert.alert(title, message, [
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
