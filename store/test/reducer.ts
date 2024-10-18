import { getIsDemoModeEnabled } from "@equinor/mad-core";
import _ from "lodash";
import { handleActions } from "redux-actions";

import {
  continueTest,
  failure,
  pauseTest,
  postTakeTestFailed,
  postTakeTestRequested,
  postTakeTestSucceeded,
  postTestFailed,
  postTestRequested,
  postTestSucceeded,
  resetTestState,
  startTest,
  success,
} from "./actions";
import * as mockData from "../../services/api/mocked-api-methods/mock-data.json";
import { Error, Node, stateKeys, TestResult, HearingTest } from "../../types";

function setNextNode(state, userResponse) {
  const clonedState = { ..._.cloneDeep(state) };

  if (userResponse.success || !userResponse.isPlayingFirstNodeFirstTime) {
    clonedState.node.data.userResponse = userResponse;
    clonedState.node = userResponse.success
      ? clonedState.node.success
      : clonedState.node.failure;
  }

  if (!(clonedState.node.success && clonedState.node.failure)) {
    // We are on a leaf-node
    clonedState.subTestIndex++;
    const nextSubTest = clonedState.test.subTests[clonedState.subTestIndex];
    const hasMoreSubTests = nextSubTest !== undefined;
    clonedState.node = hasMoreSubTests
      ? nextSubTest
      : { message: "We are finished" };

    if (!hasMoreSubTests) {
      clonedState.testIsRunning = false;
      clonedState.testIsFinished = true;
    }
  }

  return clonedState;
}

const initialState = {
  error: { message: null, status: null },
  fetching: false,
  test: {},
  subTestIndex: 0,
  node: {},
  testIsRunning: false,
  testIsFinished: false,
  testResult: {},
};

export default handleActions(
  {
    [resetTestState]: () => ({ ...initialState }),
    [postTakeTestRequested]: (state) => ({
      ...state,
      fetching: true,
    }),
    [postTakeTestSucceeded]: (state, action) => ({
      ...state,
      error: { message: null, status: null },
      fetching: false,
      test: action.payload,
    }),
    [postTakeTestFailed]: (state, action) => ({
      ...state,
      error: action.payload,
      fetching: false,
    }),
    [postTestRequested]: (state) => ({
      ...state,
      fetching: true,
    }),
    [postTestSucceeded]: (state, action) => ({
      ...state,
      error: { message: null, status: null },
      fetching: false,
      testResult: action.payload,
    }),
    [postTestFailed]: (state, action) => ({
      ...state,
      error: action.payload,
      fetching: false,
    }),
    [startTest]: (state) => ({
      ...state,
      node: state.test.subTests[state.subTestIndex],
      testIsRunning: true,
    }),
    [pauseTest]: (state) => ({ ...state, testIsRunning: false }),
    [continueTest]: (state) => ({ ...state, testIsRunning: true }),
    [success]: (state, action) =>
      setNextNode(state, { ...action.payload, success: true }),
    [failure]: (state, action) =>
      setNextNode(state, { ...action.payload, success: false }),
  },
  initialState,
);

export const selectIsFetching = (state): boolean =>
  state[stateKeys.TEST].fetching;
export const selectNode = (state): Node => state[stateKeys.TEST].node;
export const selectTest = (state): HearingTest => state[stateKeys.TEST].test;
export const selectTestIsFinished = (state): boolean =>
  state[stateKeys.TEST].testIsFinished;
export const selectTestIsRunning = (state): boolean =>
  state[stateKeys.TEST].testIsRunning;
export const selectTestResult = (state): TestResult =>
  getIsDemoModeEnabled() ? mockData.Tests[0] : state[stateKeys.TEST].testResult;
export const selectError = (state): Error => state[stateKeys.TEST].error;
