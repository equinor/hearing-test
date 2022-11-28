import { combineReducers } from "redux";

import { stateKeys } from "../../types";
import configReducer from "../app-config/reducer";
import authReducer from "../auth/reducer";
import connectivityReducer from "../connectivity/reducer";
import manifestReducer from "../manifest";
import serviceMessageReducer from "../service-message/reducer";
import testReducer from "../test/reducer";
import testsReducer from "../tests/reducer";
import toastReducer from "../toast/reducer";
import unsentTestsReducer from "../unsent-tests/reducer";

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.CONNECTIVITY]: connectivityReducer,
  [stateKeys.SERVICEMESSAGE]: serviceMessageReducer,
  [stateKeys.AUTH]: authReducer,
  [stateKeys.TOAST]: toastReducer,
  [stateKeys.TEST]: testReducer,
  [stateKeys.TESTS]: testsReducer,
  [stateKeys.APPCONFIG]: configReducer,
  [stateKeys.UNSENTTESTS]: unsentTestsReducer,
});
