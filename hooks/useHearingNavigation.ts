import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { RootStackParamList } from "../types";

export const useHearingNavigation = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

export const useHearingRoute = () => useRoute<RouteProp<RootStackParamList>>();
