import { combineReducers } from "redux";

import { stateKeys } from "../../types";
import authReducer from "../auth/reducer";
import changelogReducer from "../changelog/reducer";
import connectivityReducer from "../connectivity/reducer";
import manifestReducer from "../manifest";
import serviceMessageReducer from "../service-message/reducer";
import testReducer from "../test/reducer";
import testsReducer from "../tests/reducer";
import toastReducer from "../toast/reducer";
import versionReducer from "../version/reducer";

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.VERSION]: versionReducer,
  [stateKeys.CONNECTIVITY]: connectivityReducer,
  [stateKeys.CHANGELOG]: changelogReducer,
  [stateKeys.SERVICEMESSAGE]: serviceMessageReducer,
  [stateKeys.AUTH]: authReducer,
  [stateKeys.TOAST]: toastReducer,
  [stateKeys.TEST]: testReducer,
  [stateKeys.TESTS]: testsReducer,
});
