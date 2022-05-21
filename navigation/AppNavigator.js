import { withCommander } from "react-native-salute";
import { createStackNavigator, NavigationActions } from "react-navigation";

import FeaturePage from "../screens/FeaturePage";
import LoginPage from "../screens/LoginPage";
import mainRoutes from "./routes";

const MainRoute = createStackNavigator(mainRoutes);

const defaultGetStateForAction = MainRoute.router.getStateForAction;

MainRoute.router.getStateForAction = (action, state) => {
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routeName === "MainRoute" &&
    state.index === 0
  ) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    return null;
  }

  return defaultGetStateForAction(action, state);
};

export default createStackNavigator(
  {
    LoginRoute: { screen: withCommander(LoginPage) },
    FeatureRoute: { screen: withCommander(FeaturePage) },
    MainRoute: { screen: MainRoute },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: "none",
    animationEnabled: true,
    lazy: false,
    initialRouteName: "LoginRoute",
  }
);
