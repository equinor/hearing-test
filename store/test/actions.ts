import { createAction } from "redux-actions";

export const resetTestState = createAction("TestState/RESET");

export const postTakeTest = createAction("TakeTest/POST");
export const postTakeTestRequested = createAction("TakeTest/POST_REQUESTED");
export const postTakeTestSucceeded = createAction("TakeTest/POST_SUCCEEDED");
export const postTakeTestFailed = createAction("TakeTest/POST_FAILED");

export const postTest = createAction("Test/POST");
export const postTestRequested = createAction("Test/POST_REQUESTED");
export const postTestSucceeded = createAction("Test/POST_SUCCEEDED");
export const postTestFailed = createAction("Test/POST_FAILED");

export const success = createAction("SubTest/Success");
export const failure = createAction("SubTest/Failure");

export const startTest = createAction("Test/START");
export const stopTest = createAction("Test/STOP");
