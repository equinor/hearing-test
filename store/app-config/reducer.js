import { setConfig } from "./actions";

import { handleActions } from "redux-actions";
import { stateKeys } from "../../types";

const defaultState = {
  current: {}
};


export default handleActions(
  {
    [setConfig]: (state, action) => { 
      
      const { key, value } = action.payload;
      return {
      current: {
        ...state.current,
        [key]: value,
      }
    };
    },
  },
  defaultState
);

export const getConfig = (state) => state[stateKeys.APPCONFIG].current;
