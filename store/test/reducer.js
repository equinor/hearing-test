import _ from "lodash";
import { handleActions } from "redux-actions";

import { stateKeys } from "../../app/types";
import {
  appStartupInitFailed,
  appStartupInitRequested,
  appStartupInitSucceeded,
  failure,
  fetchTestFailed,
  fetchTestRequested,
  fetchTestSucceeded,
  postTestFailed,
  postTestRequested,
  postTestSucceeded,
  startTest,
  stopTest,
  success,
} from "./actions";

function setNextNode(state, userResponse) {
  const clonedState = _.cloneDeep(state);
  clonedState.node.data.userResponse = userResponse;
  clonedState.node = userResponse.success
    ? clonedState.node.success
    : clonedState.node.failure;

  // Remember the path we have travelled
  clonedState.userResponses.push(clonedState.node);

  if (!(clonedState.node.success && clonedState.node.failure)) {
    // We are on a leaf-node, let's save the resulting node (the leafNode we end on)
    const lastUserResponse =
      clonedState.userResponses[clonedState.userResponses.length - 1];
    clonedState.results.push(lastUserResponse);

    // Also this means one of two things:
    //    1. If more subTests. Then we have another subTest-tree... Let's go to another subTest
    //         OR
    //    2. We are done!

    const nextSubTest = clonedState.test.subTests[clonedState.results.length];
    const moreSubTests = nextSubTest !== undefined;
    clonedState.node = moreSubTests
      ? nextSubTest
      : { message: "We are finished" };
    clonedState.testIsRunning = !!moreSubTests;

    if (!moreSubTests) {
      // We are finished!
      clonedState.testIsFinished = true;
      //  Let's update the major test-tree with the path + results
      let subTestIndex = 0;
      let pointer = clonedState.test.subTests[subTestIndex];
      clonedState.userResponses.forEach((node) => {
        const uRes = node.data.userResponse;
        pointer = uRes;
        if (uRes.success) {
          if (pointer.success) {
            pointer = pointer.success;
          } else {
            subTestIndex += 1;
            pointer = clonedState.test.subTests[subTestIndex];
          }
        } else if (pointer.failure) {
          pointer = pointer.failure;
        } else {
          subTestIndex += 1;
          pointer = clonedState.test.subTests[subTestIndex];
        }
      });
    }
  }

  return clonedState;
}

export default handleActions(
  {
    [appStartupInitRequested]: (state) => ({
      ...state,
      fetching: true,
    }),
    [appStartupInitSucceeded]: (state) => {
      return {
        ...state,
        error: { message: null, status: null },
        fetching: false,
      };
    },
    [appStartupInitFailed]: (state, action) => ({
      ...state,
      error: _.isEmpty(action.payload)
        ? { message: action.payload.toString(), status: "" }
        : action.payload,
      fetching: false,
    }),

    [fetchTestRequested]: (state) => ({
      ...state,
      test: {},
      fetching: true,
    }),
    [fetchTestSucceeded]: (state, action) => {
      return {
        ...state,
        test: action.payload,
        error: { message: null, status: null },
        fetching: false,
      };
    },
    [fetchTestFailed]: (state, action) => ({
      ...state,
      error: action.payload,
      fetching: false,
    }),
    [postTestRequested]: (state) => ({
      ...state,
      testResult: {},
      fetching: true,
    }),
    [postTestSucceeded]: (state, action) => {
      return {
        ...state,
        testResult: action.payload,
        error: { message: null, status: null },
        fetching: false,
      };
    },
    [postTestFailed]: (state, action) => ({
      ...state,
      error: action.payload,
      fetching: false,
    }),
    [startTest]: (state) => {
      if (_.isEmpty(state.test)) {
        return {
          ...state,
          error: {
            message:
              "Could not start the test. The test was not loaded correctly.",
          },
        };
      }
      return {
        ...state,
        node: state.test.subTests[0],
        results: [],
        testIsFinished: false,
        testIsRunning: true,
        userResponses: [],
      };
    },
    [stopTest]: (state) => {
      return { ...state, testIsRunning: false, testIsFinished: false };
    },
    [success]: (state, action) =>
      setNextNode(state, { ...action.payload, success: true }),
    [failure]: (state, action) =>
      setNextNode(state, { ...action.payload, success: false }),
  },
  {
    error: { message: null, status: null },
    fetching: false,
    node: {},
    path: [],
    results: [],
    test: {},
    testIsFinished: false,
    testIsRunning: false,
    userResponses: [],
  }
);

export const selectIsFetching = (state) => state[stateKeys.TEST].fetching;
export const selectNode = (state) => state[stateKeys.TEST].node;
export const selectTest = (state) => state[stateKeys.TEST].test;
export const selectTestIsFinished = (state) =>
  state[stateKeys.TEST].testIsFinished;
export const selectTestIsRunning = (state) =>
  state[stateKeys.TEST].testIsRunning;
export const selectResults = (state) => state[stateKeys.TEST].results;
export const selectTestResult = (state) => state[stateKeys.TEST].testResult;
export const selectError = (state) => state[stateKeys.TEST].error;
