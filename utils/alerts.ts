import { Alert } from "react-native";

export const setAlert = (
  title: string,
  message: string,
  onConfirm: CallableFunction
) =>
  Alert.alert(title, message, [
    {
      text: "Nei",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Ja",
      onPress: () => onConfirm(),
      style: "destructive",
    },
  ]);
