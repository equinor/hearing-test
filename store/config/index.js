import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "@redux-devtools/extension";
import { AppState } from "react-native";
import { applyMiddleware, createStore } from "redux";
import { persistStore, autoRehydrate, getStoredState } from "redux-persist";
import createMigration from "redux-persist-migrate";
import { KEY_PREFIX } from "redux-persist/constants";
import createSagaMiddleware from "redux-saga";

import { stateKeys } from "../../types";
import { manifest } from "../manifest";
import reducer from "./rootReducer";
import sagas from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const migration = createMigration(manifest, stateKeys.MANIFEST);

const store = createStore(
  reducer,
  undefined,
  composeWithDevTools(
    migration,
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  )
);

persistStore(store, {
  whitelist: [stateKeys.MANIFEST, stateKeys.UNSENTTESTS],
  storage: AsyncStorage,
});

sagaMiddleware.run(sagas);

// Ensure that the pending data is applied when the app becomes active
const handleChange = (nextAppState) => {
  if (nextAppState === "active") {
    // TODO: use when implementing pin code
  }
};

AppState.addEventListener("change", handleChange);

export default store;

export const getUserPersistConfig = (userkey) => ({
  whitelist: [stateKeys.MANIFEST],
  keyPrefix: `${userkey}_${KEY_PREFIX}`,
  storage: AsyncStorage,
});

export const getPersistedState = (config) =>
  new Promise((resolve, reject) => {
    getStoredState(config, (err, restoredState) => {
      if (err) {
        reject(err);
      } else {
        resolve(restoredState);
      }
    });
  });
