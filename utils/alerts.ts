import { Alert } from "react-native";

export const confirmationDialog = (
  title: string,
  onConfirm: (value?: string) => void,
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
