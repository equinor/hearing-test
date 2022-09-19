import { handleActions } from "redux-actions";

import { stateKeys } from "../../types";
import { setVersion, clearVersion } from "./actions";

export default handleActions(
  {
    [setVersion]: (state, action) => ({
      current: action.payload,
    }),
    [clearVersion]: () => ({
      current: null,
    }),
  },
  { current: null }
);

export const getVersion = (state) => state[stateKeys.VERSION].current;
