// import { NavigationActions, StackActions } from 'react-navigation';

// let navigator = null;

// export function setNavigator(ref) {
//   navigator = ref;
// }

// export function reset() {
//   navigator.dispatch(
//     NavigationActions.reset({
//       index: 0,
//       actions: [NavigationActions.navigate({ routeName: 'DefaultRoute' })],
//     })
//   );
// }

// export function navigate(route, params) {
//   navigator.dispatch(
//     NavigationActions.navigate({
//       type: 'Navigation/NAVIGATE',
//       routeName: route,
//       params,
//     })
//   );
// }

// export function pushRoute(route, params) {
//   navigator.dispatch(
//     StackActions.push({
//       type: 'Navigation/PUSH',
//       routeName: route,
//       params,
//     })
//   );
// }

// export function goBack(key) {
//   navigator.dispatch(
//     NavigationActions.back({
//       key,
//     })
//   );
// }

// export function getCurrentRoute() {
//   if (!navigator || !navigator.state.nav) return null;

//   return navigator.state.nav.routes[navigator.state.nav.index];
// }
