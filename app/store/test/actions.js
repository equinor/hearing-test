import { createAction } from 'redux-actions';

export const fetchTest = createAction('Test/FETCH');
export const fetchTestRequested = createAction('Test/FETCH_REQUESTED');
export const fetchTestSucceeded = createAction('Test/FETCH_SUCCEEDED');
export const fetchTestFailed = createAction('Test/FETCH_FAILED');

export const setSubTest = createAction('SubTest/Update');
export const success = createAction('SubTest/Success');
export const failure = createAction('SubTest/Failure');

export const startTest = createAction('Test/START');
export const stopTest = createAction('Test/STOP');

export const registerPress = createAction('Test/Register_Press');
