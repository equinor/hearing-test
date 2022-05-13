import { handleActions } from "redux-actions";

import { stateKeys } from "../../app/types";
import {
  fetchChangelogRequested,
  fetchChangelogSucceeded,
  fetchChangelogFailed,
} from "./actions";

export default handleActions(
  {
    [fetchChangelogRequested]: (state) => ({
      ...state,
      content: {},
      fetching: true,
    }),
    [fetchChangelogSucceeded]: (state, action) => ({
      ...state,
      content: { ...action.payload },
      fetching: false,
    }),
    [fetchChangelogFailed]: (state) => ({
      ...state,
      fetching: false,
    }),
  },
  { content: {}, fetching: false }
);

export const selectChangeLog = (state) => state[stateKeys.CHANGELOG].content;

export const isFetching = (state) => state[stateKeys.CHANGELOG].fetching;
