import { NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';
import { stateKeys } from '../../types';

const initialRoute = 'LoginRoute'; // NOTE: This should match a route in ../containers/navigation.js
const initialAction = AppNavigator.router.getActionForPathAndParams(initialRoute);
const initialState = {
  ...AppNavigator.router.getStateForAction(initialAction),
  prevRoute: null,
};

const getCurrent = state => (state.index >= 0 ? getCurrent(state.routes[state.index]) : state);

const navReducer = (state = initialState, action) => {
  const { type, routeName, params } = action;

  if (!type.startsWith('Navigation/')) return state;

  const route = getCurrent(state);
  // workaround to avoid navigating twice on double click
  if (
    type === NavigationActions.NAVIGATE.toString() &&
    routeName === route.routeName &&
    JSON.stringify(params) === JSON.stringify(route.params)
  ) {
    return state;
  }
  const navState = AppNavigator.router.getStateForAction(action, state);

  if (navState) {
    return {
      ...navState,
      prevRoute: route,
    };
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return state;
};

export default navReducer;

export const getNavigation = state => state[stateKeys.NAV];
