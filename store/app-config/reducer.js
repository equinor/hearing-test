import { handleActions } from "redux-actions";

import { setConfig } from "./actions";
import { stateKeys } from "../../types";

const defaultState = {
  isDemoMode: false,
};

export default handleActions(
  {
    [setConfig]: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
  defaultState
);

export const getConfig = (state) => state[stateKeys.APPCONFIG];
