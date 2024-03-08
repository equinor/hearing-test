import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";

export const useHearingNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

export const useHearingRoute = () => useRoute<RouteProp<RootStackParamList>>();
