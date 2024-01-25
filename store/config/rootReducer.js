import { combineReducers } from "redux";

import { stateKeys } from "../../types";
import manifestReducer from "../manifest";
import testReducer from "../test/reducer";
import testsReducer from "../tests/reducer";
import unsentTestsReducer from "../unsent-tests/reducer";

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.TEST]: testReducer,
  [stateKeys.TESTS]: testsReducer,
  [stateKeys.UNSENTTESTS]: unsentTestsReducer,
});
