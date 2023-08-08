import { combineReducers } from "redux";

import { stateKeys } from "../../types";
import configReducer from "../app-config/reducer";
import manifestReducer from "../manifest";
import testReducer from "../test/reducer";
import testsReducer from "../tests/reducer";
import unsentTestsReducer from "../unsent-tests/reducer";

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.TEST]: testReducer,
  [stateKeys.TESTS]: testsReducer,
  [stateKeys.APPCONFIG]: configReducer,
  [stateKeys.UNSENTTESTS]: unsentTestsReducer,
});
