import { handleActions } from "redux-actions";

import {
  fetchTestsFailed,
  fetchTestsRequested,
  fetchTestsSucceeded,
} from "./actions";
import { TestResult, stateKeys } from "../../types";

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

export const selectTests = (state): TestResult[] =>
  state[stateKeys.TESTS].tests;
export const selectIsFetchingTests = (state): boolean =>
  state[stateKeys.TESTS].fetching;
