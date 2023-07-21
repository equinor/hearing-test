import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import createMigration from "redux-persist-migrate";
import createSagaMiddleware from "redux-saga";

import reducer from "./rootReducer";
import sagas from "./rootSaga";
import { stateKeys } from "../../types";
import { manifest } from "../manifest";

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

export default store;
