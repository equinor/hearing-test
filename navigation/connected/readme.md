# Connect navigation to redux

If for some reason you want to connect the navigation component to redux, you can do so following the steps here.

## Add the reducer to the root reducer

Import and add the ```reducer.js``` to the root reducer in ```app/store/config/rootReducer.js```.

```
(...)
import navReducer from '../../navigation/connected/reducer';

export default combineReducers({
  (...)
  [stateKeys.NAV]: navReducer,
});
```

## Export the ConnectedNavigator

Modify the default export in ```app/navigation/index.js```:

```
import AppNavigator from './connected/ConnectedNavigator';

export default AppNavigator;
```

## Disable the navigation service

To navigate from outside of components, you should now dispatch the proper navigation actions instead of using the ```app/navigation/service``` module.

Remove the navigation service from the imports and update the render method in ```screens/App.js```:

```
(...)
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
(...)
```

Navigation state should now be connected to redux.
