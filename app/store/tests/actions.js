import { createAction } from 'redux-actions';

export const fetchTests = createAction('Tests/FETCH');
export const fetchTestsRequested = createAction('Tests/FETCH_REQUESTED');
export const fetchTestsSucceeded = createAction('Tests/FETCH_SUCCEEDED');
export const fetchTestsFailed = createAction('Tests/FETCH_FAILED');
