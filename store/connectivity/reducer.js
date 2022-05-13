import { handleActions } from "redux-actions";

import { stateKeys } from "../../app/types";
import * as actions from "./actions";

export default handleActions(
  {
    [actions.setConnectivity]: (state, action) => ({
      ...state,
      connected: action.payload,
    }),
  },
  { connected: false }
);

const getConnectivityState = (state) => state[stateKeys.CONNECTIVITY];

export const getIsConnected = (state) => getConnectivityState(state).connected;
