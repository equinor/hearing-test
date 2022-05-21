import { handleActions } from "redux-actions";

import { stateKeys } from "../../types";
import {
  fetchServiceMessageRequested,
  fetchServiceMessageSucceeded,
  fetchServiceMessageFailed,
  dismissServiceMessage,
} from "./actions";

const defaultState = {
  content: {
    message: "",
  },
  fetching: false,
};

export default handleActions(
  {
    [fetchServiceMessageRequested]: (state) => ({
      ...state,
      fetching: true,
    }),
    [fetchServiceMessageSucceeded]: (state, action) => ({
      ...state,
      content: { ...action.payload },
      fetching: false,
    }),
    [fetchServiceMessageFailed]: (state) => ({
      ...state,
      fetching: false,
    }),
    [dismissServiceMessage]: () => defaultState,
  },
  defaultState
);

const serviceMessage = (state) => state[stateKeys.SERVICEMESSAGE];

export const selectServiceMessage = (state) =>
  serviceMessage(state).content.message || "";

export const isFetching = (state) => serviceMessage(state).fetching;
