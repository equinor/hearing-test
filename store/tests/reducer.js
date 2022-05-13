import { handleActions } from "redux-actions";

import { stateKeys } from "../../app/types";
import {
  fetchTestsFailed,
  fetchTestsRequested,
  fetchTestsSucceeded,
} from "./actions";

export default handleActions(
  {
    [fetchTestsRequested]: (state) => ({
      ...state,
      tests: [],
      fetching: true,
    }),
    [fetchTestsSucceeded]: (state, action) => {
      return {
        ...state,
        tests: action.payload,
        error: { message: null, status: null },
        fetching: false,
      };
    },
    [fetchTestsFailed]: (state, action) => ({
      ...state,
      error: action.payload,
      fetching: false,
    }),
  },
  {
    error: { message: null, status: null },
    fetching: false,
    tests: [],
  }
);

export const selectTests = (state) => state[stateKeys.TESTS].tests;
export const selectIsFetchingTests = (state) => state[stateKeys.TESTS].fetching;
